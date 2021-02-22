/**
 * @interface IEmailService
 */
export interface IEmailService {
  sendMail(to: string, subject: string, message: string): Promise<boolean>;
}
