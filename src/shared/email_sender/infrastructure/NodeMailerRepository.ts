import { EmailRepository } from '../domain/EmailRepository';
import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import {
	newUserEmailTemplate,
	notifyAdminNewUserEmailTemplate,
	resetPasswordEmailTemplate,
} from '../../../static/email-templates/email-template';
import { properties } from '../../../config/env.properties';

export class NodeMailerRepository implements EmailRepository {
	private readonly tranpsorter: Transporter;
	constructor() {
		this.tranpsorter = nodemailer.createTransport({
			host: properties.EMAIL_HOST,
			port: Number(properties.EMAIL_PORT),
			auth: {
				user: properties.EMAIL_AUTH_USER,
				pass: properties.EMAIL_AUTH_PASS,
			},
		});
	}

	private async sendMail(mailOptions: MailOptions): Promise<any> {
		return this.tranpsorter.sendMail(mailOptions);
	}

	private async sendMailTest(mailOption: MailOptions) {
		const tranpsorterTest = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'krystal.collier@ethereal.email',
				pass: 'kzQMUPtw6C9nddDjgZ',
			},
		});

		return tranpsorterTest.sendMail(mailOption);
	}

	async notifyAdminForNewUser(email: string, username: string) {
		await this.sendMail(
			notifyAdminNewUserEmailTemplate(
				'foria@creatio-control.com',
				email,
				username,
			),
		);
	}

	async notifyUserForNewSignUp(email: string, username: string, token: string) {
		await this.sendMail(
			newUserEmailTemplate('foria@creatio-control.com', email, username, token),
		);
	}

	async notifyUserForNewSignUpTest(
		email: string,
		username: string,
		token: string,
	) {
		await this.sendMailTest(
			newUserEmailTemplate('foria@creatio-control.com', email, username, token),
		);
	}

	async notifyUserForResetPassword(email: string, token: string) {
		await this.sendMail(
			resetPasswordEmailTemplate('foria@creatio-control.com', email, token),
		);
	}
}
