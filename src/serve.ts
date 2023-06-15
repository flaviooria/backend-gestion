import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import { initRouter } from './user/infrastructure/init.route';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

initRouter(app);

export const boostrap = () => {
	app.listen(Number(PORT), '0.0.0.0', () => {
		console.log(`Listen in port ${PORT}`);
	});
};
