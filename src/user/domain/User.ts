export class User {
	constructor(
		public readonly username: string,
		public readonly email: string,
		public readonly password: string,
		public readonly tokenAccount: string,
		public readonly id?: number,
		public readonly isAdmin?: boolean | null,
		public readonly isVerified?: boolean | null,
		public readonly tokenResetPassword?: string | null,
	) {}
}
