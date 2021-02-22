import { IEmailService } from './email.service.interface';
import { SMTPClient, Message } from 'emailjs';
import { configService } from '../config/config.service';

/**
 * @summary contains email related logic
 */
export class EmailService implements IEmailService {
  private readonly client: SMTPClient;

  /**
   * @constructor
   */
  constructor() {
    this.client = new SMTPClient({
      user: configService.get<string>('MAIL_USER'),
      password: configService.get<string>('MAIL_PASS'),
      host: configService.get<string>('MAIL_HOST'),
      ssl: true,
    });
  }

  /**
   * Sends Email Notification
   * @param to
   * @param subject
   * @param message
   */
  sendMail(to: string, subject: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.send(
        new Message({
          from: 'Paystack<noreply@shoppingcart.com>',
          to,
          subject,
          text: message,
        }),
        (err) => {
          if (err) {
            console.log(err);
            return reject(false);
          }
          resolve(true);
        }
      );
    });
  }
}
