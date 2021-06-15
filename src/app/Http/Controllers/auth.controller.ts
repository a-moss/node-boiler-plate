import { body } from 'express-validator';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import User from '../../Models/user.model';
import { minimalUserTransformer } from '../../Transformers/user.transformer';
import PasswordReset from '../../Models/password-reset.model';
import { Controller } from './controller';
import { Mail } from '../../Services/mailer.service';

export class AuthController extends Controller {
  validators = {
    credentials: [
      body('email').exists()
        .isEmail(),
      body('password').exists(),
    ],
    postGenerateForgotPassword: [
      body('email').exists()
        .isEmail(),
    ],
    postForgotPassword: [
      body('email').exists()
        .isEmail(),
      body('token').exists()
        .isEmail(),
      body('password').exists()
        .isEmail(),
    ],
  };

  async postRegister(req: express.Request, res: express.Response): Promise<void> {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, process.env.JWT_SALT_ROUNDS);

    try {
      const user = await new User({ email, password: hashedPassword }).save();
      res.send(minimalUserTransformer(user));
    } catch (e) {
      res.send({
        status: 500,
        message: 'Error when registering user.',
      });
    }
  }

  async postLogin(req: express.Request, res: express.Response): Promise<void> {
    const { email, password } = req.body;

    const user = await this.findOrFail(
      User, 'email', email, res,
    ) as User;

    if (!user) return;

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.send({
        status: 402,
        message: 'Incorrect credentials.',
      });
      return;
    }

    res.send({
      status: 200,
      token: jwt.sign(
        minimalUserTransformer(user), process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION },
      ),
    });
  }

  async postSendForgotPassword(req: express.Request, res: express.Response): Promise<void> {
    const { email } = req.body;

    const user = await this.findOrFail(
      User, 'email', email, res,
    ) as User;

    if (!user) return;

    const token = await bcrypt.hash(uuid.v4(), process.env.JWT_SALT_ROUNDS);

    const passwordReset = await new PasswordReset({ email, token, expiresAt: (Date.now() + process.env.PASSWORD_RESET_EXPIRATION) }).save();

    await Mail.to(
      user.email, 'Password reset token', passwordReset.token,
    );

    res.send({
      status: 200,
    });
  }

  async postForgotPassword(req: express.Request, res: express.Response): Promise<void> {
    const { email, token, password } = req.body;

    const passwordReset = await this.findOrFail(
      PasswordReset, 'email', email, res,
    ) as PasswordReset;
    const user = await this.findOrFail(
      User, 'email', email, res,
    ) as User;

    if (!user || !passwordReset) return;

    const match = await bcrypt.compare(token, passwordReset.token);

    if (!match || Date.now() > passwordReset.expiresAt) {
      res.send({
        status: 402,
        message: 'Incorrect credentials.',
      });
    }

    user.password = await bcrypt.hash(password, process.env.JWT_SALT_ROUNDS);
    await user.save();

    res.send({
      status: 200,
    });
  }
}
