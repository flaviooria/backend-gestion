import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { PGUserReposityory } from '../user_respository/PGUserRespository';
import { UserApplicationServiceUseCase } from '../../application/UserApplicationServiceUseCase';

const userRepository = new PGUserReposityory();
const userApplicacationServiceUseCase = new UserApplicationServiceUseCase(
	userRepository,
);
const userController = new UserController(userApplicacationServiceUseCase);

const userRouter = Router();

userRouter.post('/', userController.createUser.bind(userController));
userRouter.get('/:id', userController.getUser.bind(userController));
userRouter.put('/:id', userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));


export default userRouter;