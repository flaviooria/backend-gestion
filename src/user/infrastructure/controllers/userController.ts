import { Request, Response } from 'express';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserApplicationServiceUseCase } from '../../application/UserApiServiceUseCase';
import { UserEmailSenderServiceUseCase } from '../../application/UserEmailSenderService';

export class UserController {
	constructor(
		private readonly userEmailSenderService: UserEmailSenderServiceUseCase,
		private readonly userApiService: UserApplicationServiceUseCase,
	) {}

	public async getUser(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		try {
			const userFounded = await this.userApiService.getUser(Number(id));

			if (!userFounded) {
				return res.status(404).send({ message: 'User not found' });
			}

			res.status(200).send({
				message: {
					username: userFounded?.username,
					email: userFounded?.email,
					isVerified: userFounded?.isVerified,
					isAdmin: userFounded?.isAdmin,
				},
			});
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async createUser(req: Request, res: Response) {
		try {
			const {
				body: { username, email, password },
			} = req;

			if (!username || !password || !email) {
				return res.status(404).send({ message: 'Field not valid!' });
			}

			//Generar token
			const token = v4();

			//Encriptar contraseña
			const passwordHash = bcrypt.hashSync(password, 5);

			const usercreated = await this.userApiService.createUser(
				username,
				email,
				passwordHash,
				token,
			);

			if (usercreated === undefined)
				return res
					.status(400)
					.send({ message: 'The user already exists or something goes wrong' });

			// Envio de email
			await this.userEmailSenderService.notifyUserWhenUserSignUp(
				email,
				username,
				token,
			);

			res.status(201).send({
				message: {
					id: usercreated.id,
					username: username,
					email: email,
				},
			});
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async deleteUser(req: Request, res: Response) {
		try {
			const {
				params: { id },
			} = req;

			if (!id) return res.status(400).send({ message: 'Id not provided' });

			const deleteUser = await this.userApiService.deleteUser(Number(id));

			if (deleteUser) res.status(200).send({ message: 'User deleted' });
			else res.status(404).send({ message: 'User not found' });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async updateUser(req: Request, res: Response) {
		try {
			const {
				params: { id },
				body: { ...fieldsToUpgrade },
			} = req;

			if (!id) return res.status(400).send({ message: 'Id not provided' });

			const updateUser = await this.userApiService.updateUser(
				Number(id),
				fieldsToUpgrade,
			);

			if (updateUser === undefined)
				res.status(404).send({ message: 'Something goes wrong' });
			else
				res.status(201).send({
					message: {
						username: updateUser.username,
						email: updateUser.email,
						isVerified: updateUser.isVerified,
						isAdmin: updateUser.isAdmin,
					},
				});
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async signIn(req: Request, res: Response) {
		try {
			const {
				body: { email, password },
			} = req;

			if (!email || !password)
				return res.status(400).send({ message: 'Field not valid!' });

			const userFinded = await this.userApiService.signIn(email, password);

			//Password match or not match
			if (bcrypt.compareSync(password, userFinded?.password!))
				return res.status(200).send({ message: 'User Logged' });
			else return res.status(401).send({ message: 'Invalid credentials' });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async verifyToken(req: Request, res: Response) {
		try {
			const {
				params: { token },
			} = req;

			if (!token) return res.status(400).send({ message: 'Field not valid!' });

			const userFinded = await this.userApiService.verifyToken(token);

			if (userFinded?.tokenAccount == token) {
				await this.userApiService.updateUser(userFinded?.id as number, {
					isVerified: true,
				});
				return res.status(200).send({ message: 'User verified' });
			} else {
				return res.status(401).send({ message: 'Invalid token' });
			}
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}
}
