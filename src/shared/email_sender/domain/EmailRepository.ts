export interface EmailRepository {
	notifyUserForNewSignUpTest(
		email: string,
		username: string,
		token: string,
	): any;
	notifyAdminForNewUser(email: string, username: string): any;
	notifyUserForNewSignUp(email: string, username: string, token: string): any;
	notifyUserForResetPassword(email: string, token: string): any;
}
