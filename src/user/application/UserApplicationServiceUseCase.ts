import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../domain/User';

export class UserApplicationServiceUseCase {
	constructor(private userRepository: IUserRepository) {}
	async getUser(id: string): Promise<User | null> {
		return await this.userRepository.getUser(id);
	}
	async getAllUser(): Promise<User[]> {
		return await this.userRepository.getAllUser();
	}
	async createUser(
		id: string,
		username: string,
		email: string,
		password: string,

	): Promise<User> {
		const user = new User(id, username, email, password);

		return await this.userRepository.createUser(user);
	}
	async deleteUser(id: string): Promise<boolean> {
		return await this.userRepository.deleteUser(id);
	}
	async updateUser(id: string, fieldsToUpdate: Partial<User>): Promise<User> {
		return await this.userRepository.updateUser(id, fieldsToUpdate);
	}
}
