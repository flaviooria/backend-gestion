import { NodeMailerRepository } from '../../shared/email_sender/infrastructure/NodeMailerRepository';

export class UserEmailSenderServiceUseCase {
	constructor(private emailRepository: NodeMailerRepository) {}

	async notifyUserWhenUserSignUp(
		email: string,
		username: string,
		token: string,
	): Promise<any> {
		return this.emailRepository.notifyUserForNewSignUp(email, username, token);
	}

	async notifyUserForResetPassword(email: string, token: string): Promise<any> {
		return this.emailRepository.notifyUserForResetPassword(email, token);
	}
}
