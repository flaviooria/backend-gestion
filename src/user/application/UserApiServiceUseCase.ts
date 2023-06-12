import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../domain/User';

export class UserApplicationServiceUseCase {
	constructor(private userRepository: IUserRepository) {}
	async getUser(id: number): Promise<User | null> {
		return await this.userRepository.getUser(id);
	}
	async getAllUser(): Promise<User[]> {
		return await this.userRepository.getAllUser();
	}
	async createUser(
		username: string,
		email: string,
		password: string,
		token: string,
	): Promise<User | undefined> {
		const user = new User(username, email, password, token);

		return await this.userRepository.createUser(user);
	}
	async deleteUser(id: number): Promise<boolean> {
		return await this.userRepository.deleteUser(id);
	}
	async updateUser(
		id: number,
		fieldsToUpdate: Partial<User>,
	): Promise<User | undefined> {
		return await this.userRepository.updateUser(id, fieldsToUpdate);
	}

	async signIn(email: string, password: string): Promise<User | null> {
		return await this.userRepository.signIn(email, password);
	}

	async getUserByToken(token: string): Promise<User | null> {
		return await this.userRepository.getUserByToken(token);
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return await this.userRepository.getUserByEmail(email);
	}

	async getUserByTokenResetPassword(token: string): Promise<User | null> {
		return await this.userRepository.getUserByTokenResetPassword(token);
	}
}
