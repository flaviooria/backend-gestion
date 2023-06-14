import { Router } from 'express';
import { UserController } from '../controllers/userController';

import { SqliteUserRepository } from '../user_respository/SQLITEUserRepository';
import { UserApiServiceUseCase } from '../../application/UserApiServiceUseCase';
import { UserEmailSenderServiceUseCase } from '../../application/UserEmailSenderService';
import { NodeMailerRepository } from '../../../shared/email_sender/infrastructure/NodeMailerRepository';

const userSqliteRepository = new SqliteUserRepository();
const userApiServiceUseCase = new UserApiServiceUseCase(userSqliteRepository);

const emailRepository = new NodeMailerRepository();
const userEmailSenderService = new UserEmailSenderServiceUseCase(
	emailRepository,
);

const userController = new UserController(
	userEmailSenderService,
	userApiServiceUseCase,
);

const userRouter = Router();

userRouter.get('/:id', userController.getUser.bind(userController));
userRouter.get(
	'/verify/:token',
	userController.verifyNewUserByToken.bind(userController),
);
userRouter.post('/signup', userController.createUser.bind(userController));
userRouter.post('/signin', userController.signIn.bind(userController));
userRouter.patch('/:id', userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));

export default userRouter;
