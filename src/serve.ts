import express, { Application, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

export const boostrap = () => {
	app.listen(Number(PORT), '0.0.0.0', () => {
		console.log(`Listen in port ${PORT}`);
	});
};
