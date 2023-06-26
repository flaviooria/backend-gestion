export interface EmailRepository {
	notifyAdminForNewUser(email: string, username: string): any;
	notifyUserForNewSignUp(email: string, username: string, token: string): any;
	notifyUserForResetPassword(email: string, token: string): any;
}
