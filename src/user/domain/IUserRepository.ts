import { User } from './User';

export interface IUserRepository {
	getUser(id: number): Promise<User | null>;
	getAllUser(): Promise<User[]>;
	createUser(user: User): Promise<User | undefined>;
	deleteUser(id: number): Promise<boolean>;
	updateUser(
		id: number,
		fieldsToUpdate: Partial<User>,
	): Promise<User | undefined>;
	signIn(email: string, password: string): Promise<User | null>;
	getUserByToken(token: string): Promise<User | null>;
	getUserByEmail(email: string): Promise<User | null>;
	getUserByTokenResetPassword(token: string): Promise<User | null>;
}
