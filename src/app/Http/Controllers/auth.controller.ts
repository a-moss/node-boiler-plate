import { body } from 'express-validator';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import User from '../../Models/user.model';
import { minimalUserTransformer } from '../../Transformers/user.transformer';
import PasswordReset from '../../Models/password-reset.model';

export class AuthController {
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

  async postRegister(req: express.Request, res: express.Response): Promise<any> {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, process.env.JWT_SALT_ROUNDS);

    try {
      const user = await new User({ email, password: hashedPassword }).save();
      return res.send(minimalUserTransformer(user));
    } catch (e) {
      return res.send({
        status: 500,
        message: 'Error when registering user.',
      });
    }
  }

  async postLogin(req: express.Request, res: express.Response): Promise<any> {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.send({
          status: 401,
          message: 'Record not found.',
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.send({
          status: 402,
          message: 'Incorrect credentials.',
        });
      }

      return res.send({
        status: 200,
        token: jwt.sign(
          minimalUserTransformer(user), process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION },
        ),
      });
    } catch (e) {
      return res.send(e);
    }
  }

  // TODO: It's a security vulnerability to have this function return a response via the API. It should email the user directly
  async postSendForgotPassword(req: express.Request, res: express.Response): Promise<any> {
    const { email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.send({
          status: 200,
        });
      }

      const token = await bcrypt.hash(uuid.v4(), process.env.JWT_SALT_ROUNDS);

      const passwordReset = await new PasswordReset({ email, token, expiresAt: (Date.now() + process.env.PASSWORD_RESET_EXPIRATION) }).save();

      return res.send({
        status: 200,
        token: passwordReset.token,
      });
    } catch (e) {
      return res.send({
        status: 500,
        message: 'Error sending forgot password.',
      });
    }
  }

  async postForgotPassword(req: express.Request, res: express.Response): Promise<any> {
    const { email, token, password } = req.body;

    try {
      const passwordReset = await PasswordReset.findOne({
        where: {
          email,
        },
      });

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!passwordReset || !user) {
        return res.send({
          status: 401,
          message: 'Record not found',
        });
      }

      const match = await bcrypt.compare(token, passwordReset.token);

      if (!match || Date.now() > passwordReset.expiresAt) {
        return res.send({
          status: 402,
          message: 'Incorrect credentials.',
        });
      }

      user.password = await bcrypt.hash(password, process.env.JWT_SALT_ROUNDS);
      await user.save();

      return res.send({
        status: 200,
      });
    } catch (e) {
      return res.send({
        status: 500,
        message: 'Error resetting password.',
      });
    }
  }
}
