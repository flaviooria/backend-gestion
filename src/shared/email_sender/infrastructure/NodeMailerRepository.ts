import { EmailRepository } from '../domain/EmailRepository';
import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import {
	newUserEmailTemplate,
	notifyAdminNewUserEmailTemplate,
} from '../../../static/email-templates/email-template';

export class NodeMailerRepository implements EmailRepository {
	private readonly tranpsorter: Transporter;

	constructor() {
		// TODO => Cambiar a variables de entorno
		this.tranpsorter = nodemailer.createTransport({
			host: 'smtp-relay.sendinblue.com',
			port: 587,
			auth: {
				user: 'foria@creatio-control.com',
				pass: 'YHQy15EbjUZCcAt3',
			},
		});
	}

	async sendMail(mailOptions: MailOptions): Promise<any> {
		return this.tranpsorter.sendMail(mailOptions);
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
}
