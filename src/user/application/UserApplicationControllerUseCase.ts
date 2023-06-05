class UserApplicationControllerUseCase {
	constructor(private userRepository: IUserRepository) {}
	async getUser(): Promise<User> {
		return await this.userRepository.getUser();
	}
	async createUser(user: User): Promise<void> {
		return await this.userRepository.createUser(user);
	}
	async deleteUser(id: string): Promise<void> {
		return await this.userRepository.deleteUser(id);
	}
	async updateUser(id: string, fieldsToUpdate: Partial<User>): Promise<void> {
		return await this.userRepository.updateUser(id, fieldsToUpdate);
	}
}
