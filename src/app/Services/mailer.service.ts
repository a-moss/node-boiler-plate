import nodemailer from 'nodemailer';
import { MailConfig } from '../../config/mail';

class Mail {
  async to(
      toAddress: string, subject: string, text: string, html?: string,
  ) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${MailConfig.from.name}" <${MailConfig.from.address}>`,
      to: toAddress,
      subject,
      text,
      html: html ?? text,
    });

    return nodemailer.getTestMessageUrl(info);
  }
}

const mailer = new Mail();
export {
  mailer as Mail,
};
