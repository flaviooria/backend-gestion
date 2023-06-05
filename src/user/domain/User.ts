class User {
	constructor(
		private id: string,
		private username: string,
		private password: string,
		private isAdmin: boolean,
		private isVerified: boolean,
		private tokenEmail: string,
	) {}
}
