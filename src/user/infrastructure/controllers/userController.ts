import { Request, Response } from 'express';
import { UserApplicationServiceUseCase } from '../../application/UserApplicationServiceUseCase';

export class UserController {
	constructor(
		private readonly userApplicationServiceUseCase: UserApplicationServiceUseCase,
	) {}

	public async getUser(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		try {
			const userFounded = await this.userApplicationServiceUseCase.getUser(id);
			

			if (!userFounded) {
				return res.status(404).send({ message: 'User not found' });
			}

			res.status(200).send({ message:  {
				username:userFounded?.username,
				email:userFounded?.password,
				isVerified: userFounded?.isVerified,
				isAdmin: userFounded?.isAdmin
				
			}});
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ message: error?.message || 'Internal server error' });
		}
	}

	public async createUser(req: Request, res: Response) {
		const {
			body: { id, username, email, password },
		} = req;

		if (!id || !username || !password || !email) {
			return res.status(404).send({ message: 'Field not valid!' });
		}

		const usercreated = await this.userApplicationServiceUseCase.createUser(
			id,
			username,
			email,
			password,
		);
		if(usercreated === undefined) return res.status(400).send({message:'The user already exists or something goes wrong'});

		res.status(201).send({
			message:{
				id:id,
			username:username,
			email:email
			}
			
		});
	}

	public async deleteUser(req: Request, res: Response) {
		const {
			params: { id },
		} = req;

		if (!id) return res.status(400).send({ message: 'Id not provided' });

		const deleteUser = await this.userApplicationServiceUseCase.deleteUser(id);

		if (deleteUser) res.status(200).send({ message: 'User deleted' });
		else res.status(404).send({ message: 'User not found' });
	}

	public async updateUser(req: Request, res: Response) {
		const {
			params: { id },
			body: { ...fieldsToUpgrade },
		} = req;

		if (!id) return res.status(400).send({ message: 'Id not provided' });

		const updateUser = await this.userApplicationServiceUseCase.updateUser(
			id,
			fieldsToUpgrade,
		);

		if (updateUser === undefined) res.status(404).send({ message: 'Something goes wrong' });
		else res.status(200).send({ message: {
			username:updateUser.username,
			email:updateUser.email,
			isVerified:updateUser.isVerified,
			isAdmin:updateUser.isAdmin
		} });
	}
}
