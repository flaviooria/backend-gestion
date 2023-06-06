import { Application } from 'express';
import { Router } from 'express';
import userRouter from './route/userRoute';


function initRouter(app: Application) {
	let routerController = Router();

	routerController.use('/users', userRouter);
	app.use('/api/v1', routerController);
}
export { initRouter };