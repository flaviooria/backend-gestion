import { EmailRepository } from '../domain/EmailRepository';
import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import {
	newUserEmailTemplate,
	notifyAdminNewUserEmailTemplate,
	resetPasswordEmailTemplate,
} from '../../../static/email-templates/email-template';
import { propertiesGlobal } from '../../../config/env.properties';

export class NodeMailerRepository implements EmailRepository {
	private readonly tranpsorter: Transporter;
	constructor() {
		this.tranpsorter = this.getTransporterAccordingToEnvMode();
	}

	private getTransporterAccordingToEnvMode() {
		return nodemailer.createTransport({
			host: propertiesGlobal.propertiesEmail?.email_host,
			port: 587,
			auth: {
				user: propertiesGlobal.propertiesEmail?.email_auth_user,
				pass: propertiesGlobal.propertiesEmail?.email_auth_pass,
			},
		});
	}

	private async sendMail(mailOptions: MailOptions): Promise<any> {
		return await this.tranpsorter.sendMail(mailOptions);
	}

	async notifyAdminForNewUser(email: string, username: string) {
		return await this.sendMail(
			notifyAdminNewUserEmailTemplate(
				'foria@creatio-control.com',
				email,
				username,
			),
		);
	}

	async notifyUserForNewSignUp(email: string, username: string, token: string) {
		return await this.sendMail(
			newUserEmailTemplate('foria@creatio-control.com', email, username, token),
		);
	}

	async notifyUserForResetPassword(email: string, token: string) {
		return await this.sendMail(
			resetPasswordEmailTemplate('foria@creatio-control.com', email, token),
		);
	}
}
