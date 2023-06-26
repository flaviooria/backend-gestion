type PropertiesOptions = {
	mode: string;
	db_host: string;
	db_port: number;
	db_username: string;
	db_password: string;
	db_database: string;
	server_port: number;
	url_frontend: string;
	email_host: string;
	email_port: number;
	email_auth_user: string;
	email_auth_pass: string;
};

type propertiesEmail = Pick<
	PropertiesOptions,
	'email_host' | 'email_port' | 'email_auth_user' | 'email_auth_pass'
>;

type propertiesDatabase = Pick<
	PropertiesOptions,
	'db_host' | 'db_port' | 'db_username' | 'db_password' | 'db_database'
>;

type propertiesServer = Pick<PropertiesOptions, 'server_port' | 'url_frontend'>;

export type properties = {
	propertiesEmail: Partial<propertiesEmail>;
	propertiesDatabase: Partial<propertiesDatabase>;
	propertiesServer: Partial<propertiesServer>;
};
