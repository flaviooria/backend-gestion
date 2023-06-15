import { Request, Response } from 'express';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserApplicationServiceUseCase } from '../../application/UserApiServiceUseCase';
import { UserEmailSenderServiceUseCase } from '../../application/UserEmailSenderService';
import { nanoid } from 'nanoid';

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

			res.status(201).send({
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

			if (deleteUser)
				res.status(201).send({ message: `User with id ${id} deleted` });
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
				return res.status(201).send({
					message: {
						id: userFinded?.id,
						username: userFinded?.username,
						email: userFinded?.email,
						isVerified: userFinded?.isVerified,
						isAdmin: userFinded?.isAdmin,
					},
				});
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

			const userFinded = await this.userApiService.getUserByToken(token);

			if (userFinded?.tokenAccount == token) {
				const userUpdated = await this.userApiService.updateUser(
					userFinded?.id as number,
					{
						isVerified: true,
					},
				);

				return res.status(201).send({
					message: {
						id: userUpdated?.id,
						username: userUpdated?.username,
						email: userUpdated?.email,
						isVerified: userUpdated?.isVerified,
						isAdmin: userUpdated?.isAdmin,
					},
				});
			} else {
				return res.status(401).send({ message: 'Invalid token' });
			}
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async forgotPasswordSendemail(req: Request, res: Response) {
		try {
			const {
				body: { email },
			} = req;

			const userFounded = await this.userApiService.getUserByEmail(email);

			if (!userFounded) {
				return res.status(404).send({ message: 'User not found' });
			}

			const token = nanoid(6);

			const updateUser = await this.userApiService.updateUser(
				userFounded?.id as number,
				{
					tokenResetPassword: token,
				},
			);

			//Envio mail
			await this.userEmailSenderService.notifyUserForResetPassword(
				email,
				token,
			);

			res.status(201).send({
				message: {
					id: updateUser?.id,
					email: updateUser?.email,
					tokenResetPassword: updateUser?.tokenResetPassword,
				},
			});
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async forgotPasswordVerify(req: Request, res: Response) {
		try {
			const {
				body: { token, password },
			} = req;

			if (!token || !password)
				return res.status(400).send({ message: 'Field not valid!' });

			const userFinded = await this.userApiService.getUserByTokenResetPassword(
				token,
			);

			if (!userFinded)
				return res.status(404).send({ message: 'User not found' });

			//Encriptar contraseña
			const passwordHash = bcrypt.hashSync(password, 5);

			const updateUser = await this.userApiService.updateUser(
				userFinded?.id as number,
				{
					password: passwordHash,
					tokenResetPassword: '',
				},
			);

			res.status(201).send({
				message: {
					id: updateUser?.id,
					username: updateUser?.username,
					email: updateUser?.email,
					isVerified: updateUser?.isVerified,
					isAdmin: updateUser?.isAdmin,
				},
			});
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}
}
