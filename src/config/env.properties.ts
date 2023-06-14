import * as dotenv from 'dotenv';

dotenv.config();

export const properties = {
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	PORT: process.env.PORT,
	EMAIL_HOST: process.env.EMAIL_HOST,
	EMAIL_PORT: process.env.EMAIL_PORT,
	EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
	EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS,
};
