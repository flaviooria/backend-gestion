import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/IUserRepository';
import { User } from '../../domain/User';

export class PGUserReposityory implements IUserRepository {
	private prisma = new PrismaClient();

	async getUser(id: number): Promise<User | null> {
		const userFounded = await this.prisma.user.findUnique({
			where: { id: id },
		});

		if (userFounded == null) return null;

		return userFounded;
	}
	async getAllUser(): Promise<User[]> {
		const allUsers = await this.prisma.user.findMany();

		return allUsers;
	}
	async createUser(user: User): Promise<User> {
		let userCreated: User;
		try {
			userCreated = await this.prisma.user.create({
				data: {
					id: user.id,
					username: user.username,
					email: user.email,
					password: user.password,
					tokenAccount: user.tokenAccount,
					isAdmin: user.isAdmin,
					isVerified: user.isVerified,
				},
			});
		} catch (error: any) {
			if (error.code == 'P2002') {
			}
		}
		return userCreated!;
	}
	async deleteUser(id: number): Promise<boolean> {
		try {
			await this.prisma.user.delete({
				where: {
					id: id,
				},
			});
		} catch (error: any) {
			if (error.code === 'P2025') {
				return false;
			}
		}
		return true;
	}
	async updateUser(id: number, fieldsToUpdate: Partial<User>): Promise<User> {
		let userUpdated: User;
		try {
			userUpdated = await this.prisma.user.update({
				where: {
					id: id,
				},
				data: fieldsToUpdate,
			});
		} catch (error: any) {
			if (error.code === 'P2025') {
				console.log('User not founded');
			}
		}
		return userUpdated!;
	}
}
