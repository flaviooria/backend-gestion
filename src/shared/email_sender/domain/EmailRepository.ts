import { MailOptions } from 'nodemailer/lib/json-transport';

export interface EmailRepository {
	sendMail(mailOption: MailOptions): any;
	notifyAdminForNewUser(email: string, username: string): any;
	notifyUserForNewSignUp(email: string, username: string, token: string): any;
	notifyUserForResetPassword(email: string, token: string): any;
}
