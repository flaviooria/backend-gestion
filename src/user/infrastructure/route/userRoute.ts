import { Router } from 'express';
import { UserController } from '../controllers/userController';

import { SqliteUserRepository } from '../user_respository/SQLITEUserRepository';
import { UserApplicationServiceUseCase } from '../../application/UserApiServiceUseCase';
import { UserEmailSenderServiceUseCase } from '../../application/UserEmailSenderService';
import { NodeMailerRepository } from '../../../shared/email_sender/infrastructure/NodeMailerRepository';

const userSqliteRepository = new SqliteUserRepository();
const userApiServiceUseCase = new UserApplicationServiceUseCase(
	userSqliteRepository,
);

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
userRouter.post('/', userController.createUser.bind(userController));
userRouter.patch('/reset-password', userController.forgotPasswordSendemail.bind(userController));
userRouter.patch('/reset-password/verify', userController.forgotPasswordVerify.bind(userController));
userRouter.patch('/:id', userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));
userRouter.post('/signin', userController.signIn.bind(userController));
userRouter.patch('/verify/:token', userController.verifyToken.bind(userController));


export default userRouter;
