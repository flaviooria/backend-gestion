import * as dotenv from 'dotenv';
import { properties } from './types.enviroment';

dotenv.config({ path: '.env' });

const propertiesGlobal: Partial<properties> = {};

if (process.env.NODE_ENV === 'production') {
	propertiesGlobal.propertiesEmail = {
		email_host: process.env.EMAIL_HOST,
		email_port: Number(process.env.EMAIL_PORT),
		email_auth_user: process.env.EMAIL_AUTH_USER,
		email_auth_pass: process.env.EMAIL_AUTH_PASS,
	};

	propertiesGlobal.propertiesDatabase = {
		db_host: process.env.DB_HOST,
		db_port: Number(process.env.DB_PORT),
		db_username: process.env.DB_USERNAME,
		db_password: process.env.DB_PASSWORD,
		db_database: process.env.DB_DATABASE,
	};

	propertiesGlobal.propertiesServer = {
		server_port: Number(process.env.SERVER_PORT),
		url_frontend: process.env.URL_FRONTEND,
	};
} else {
	dotenv.config({ path: '.env.local' });

	propertiesGlobal.propertiesEmail = {
		email_host: process.env.EMAIL_HOST_DEV,
		email_port: Number(process.env.EMAIL_PORT_DEV),
		email_auth_user: process.env.EMAIL_AUTH_USER_DEV,
		email_auth_pass: process.env.EMAIL_AUTH_PASS_DEV,
	};

	propertiesGlobal.propertiesDatabase = {
		db_host: process.env.DB_HOST_DEV,
		db_port: Number(process.env.DB_PORT_DEV),
		db_username: process.env.DB_USERNAME_DEV,
		db_password: process.env.DB_PASSWORD_DEV,
		db_database: process.env.DB_DATABASE_DEV,
	};

	propertiesGlobal.propertiesServer = {
		server_port: Number(process.env.SERVER_PORT_DEV),
		url_frontend: process.env.URL_FRONTEND_DEV,
	};
}

export { propertiesGlobal };
