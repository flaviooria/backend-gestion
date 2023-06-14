import { prisma } from '../../../../prisma/client';
import { IUserRepository } from '../../domain/IUserRepository';
import { User } from '../../domain/User';

export class SqliteUserRepository implements IUserRepository {
	async getUser(id: number): Promise<User | null> {
		try {
			const userFounded = await prisma.user.findUnique({
				where: { id: id },
			});

			if (userFounded == null) return null;

			return userFounded;
		} catch (error) {
			throw new Error('Params not valid');
		}
	}
	async getAllUser(): Promise<User[]> {
		const allUsers = await prisma.user.findMany();

		return allUsers;
	}
	async createUser(user: User): Promise<User | undefined> {
		try {
			const userCreated = await prisma.user.create({
				data: {
					id: user.id,
					username: user.username,
					email: user.email,
					password: user.password,
					isAdmin: user.isAdmin,
					isVerified: user.isVerified,
					tokenAccount: user.tokenAccount,
				},
			});

			return userCreated;
		} catch (error: any) {}
	}
	async deleteUser(id: number): Promise<boolean> {
		try {
			await prisma.user.delete({
				where: {
					id: id,
				},
			});
		} catch (error: any) {
			throw new Error('Something goes wrong on delete user');
		}
		return true;
	}
	async updateUser(
		id: number,
		fieldsToUpdate: Partial<User>,
	): Promise<User | undefined> {
		try {
			const userUpdated = await prisma.user.update({
				where: {
					id: id,
				},
				data: fieldsToUpdate,
			});

			return userUpdated;
		} catch (error: any) {
			throw new Error('Something goes wrong on update user');
		}
	}

	async signIn(email: string): Promise<User | null> {
		try {
			const userLoged = await prisma.user.findUnique({
				where: { email: email },
			});

			//User not found
			if (!userLoged) return null;

			return userLoged;
		} catch (error) {
			throw new Error('Something goes wrong on sign in user');
		}
	}

	async getUserByToken(token: string): Promise<User | null> {
		try {
			const userLoged = await prisma.user.findFirst({
				where: { tokenAccount: token },
			});

			//User not found
			if (!userLoged) return null;

			return userLoged;
		} catch (error) {
			throw new Error('Something goes wrong on sign in user');
		}
	}
}
