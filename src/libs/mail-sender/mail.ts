import PQueue from 'p-queue';
import nodemailer from 'nodemailer';
import { resetPassword } from './email-templates';
import { config } from '@/configs';
import { IContactPortfolioRequest } from '@/modules/portfolio/contact-portfolio.entities';
import { portfolioContact } from '@/libs/mail-sender/email-templates/portfolio-contact.html';

interface IMailOptions {
  to: string;
  subject: string;
  html?: string;
}

interface IForgotPasswordEmail {
  emailTo: string;
  username: string;
  code: string;
}

export class MailSender {
  // eslint-disable-next-line no-use-before-define
  private static instance: MailSender;
  private pQueue: PQueue | undefined;
  private transporter;

  constructor() {
    try {
      this.pQueue = new PQueue({
        concurrency: 1,
        intervalCap: 100,
        interval: 100_000
      });
      this.transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        service: 'gmail',
        auth: {
          user: 'nguyenthang.fe@gmail.com',
          pass: 'zxsr qncb xtxt uyta'
        }
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('ERROR::createTransporter - ', err);
    }
  }

  public static getInstance(): MailSender {
    if (!MailSender.instance) {
      MailSender.instance = new MailSender();
    }
    return MailSender.instance;
  }

  private async sendMail(mailOptions: IMailOptions) {
    return await this.pQueue?.add(async () => {
      try {
        return new Promise(resolve =>
          this.transporter?.sendMail(mailOptions, async error => {
            if (error) {
              // eslint-disable-next-line no-console
              console.error('Mail sending failed, check your service credentials.');
              resolve(false);
            }
            resolve(true);
          })
        );
      } catch (error: any) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
      }
    });
  }

  public async sendForgotPasswordEmail({
    emailTo,
    username,
    code
  }: IForgotPasswordEmail) {
    const subject = config.email.subject.resetPassword + `<${emailTo}>`;
    const buttonLink =
      `${config.email.resetPasswordUrl}/${code}?email=${
        encodeURIComponent(emailTo)
      }`;

    const mail = resetPassword
      .replace(new RegExp('--PersonName--', 'g'), username)
      .replace(new RegExp('--ProjectColor--', 'g'), config.email.color)
      .replace(new RegExp('--ContactLink--', 'g'), config.email.urlContact)
      .replace(new RegExp('--ClickTracking--', 'g'), config.email.clickTrackingValue)
      .replace(new RegExp('--LinkResetPassword--', 'g'), buttonLink);

    const mailOptions = {
      from: config.email.from,
      to: emailTo,
      subject,
      html: mail
    };
    return await this.sendMail(mailOptions);
  };

  public async sendContactFormPortfolio({
    subject,
    message,
    email,
    customerName
  }: IContactPortfolioRequest) {
    const subjectEmail = config.email.subject.contactPortfolio;
    const messageEmail: string = config.email.message.contactPortfolio
      .replace(new RegExp('--SUBJECT--', 'g'), subject)
      .replace(new RegExp('--CUSTOMER_NAME--', 'g'), customerName)
      .replace(new RegExp('--EMAIL--', 'g'), email || '')
      .replace(new RegExp('--MESSAGE--', 'g'), message || '');

    const mail = portfolioContact
      .replace(new RegExp('--ProjectMessage--', 'g'), messageEmail)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.email.logo)
      .replace(new RegExp('--ProjectName--', 'g'), config.email.name)
      .replace(new RegExp('--ProjectColor--', 'g'), config.email.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.email.url)
      .replace(new RegExp('--ClickTracking--', 'g'), config.email.clickTrackingValue);

    const mailOptions = {
      from: config.email.from,
      to: config.email.to,
      subject: subjectEmail,
      html: mail
    };
    return await this.sendMail(mailOptions);
  };
}

const mailSender = MailSender.getInstance();

export type { IMailOptions, IForgotPasswordEmail };
export default mailSender;