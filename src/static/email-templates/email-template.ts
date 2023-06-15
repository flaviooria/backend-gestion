import { properties } from '../../config/env.properties';

export const newUserEmailTemplate = (
	emailFrom: string,
	emailRegistered: string,
	username: string,
	token: string,
) => {
	return {
		from: emailFrom,
		to: emailRegistered,
		subject: `${username}, Welcome to the our website`,
		text: 'Welcome to the our website',
		html: `
      <h1>Welcome to our website!</h1>
      <p>We're glad you've decided to join us. We hope you find everything you're looking for here and enjoy using our site.</p>
      <p>If you have any questions or need any help, please don't hesitate to contact us. Thank you for signing up!</p>
	  <p>this is your token <a href="${properties.URL_FRONTEND}/verify?token=${token}">Verificar</a></p>
    `,
	};
};

export const notifyAdminNewUserEmailTemplate = (
	emailFrom: string,
	emailRegistered: string,
	username: string,
) => {
	return {
		from: emailFrom,
		to: emailFrom,
		subject: `New User: ${username} - email: ${emailRegistered}`,
		text: `New User: ${username} - email: ${emailRegistered}`,
		html: `
      <h1>New User: ${username}</h1>
      <p>email: ${emailRegistered}</p>
    `,
	};
};

export const resetPasswordEmailTemplate = (
	emailFrom: string,
	emailRegistered: string,
	tokenResetPassword: string,
) => {
	return {
		from: emailFrom,
		to: emailRegistered,
		subject: `Reset Password`,
		text: `Reset Password: ${tokenResetPassword}`,
		html: `<h1>Hi, ${emailRegistered}</h1>
	  	<p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
		<p>Please copy the code and past in the field to reset your password.</p>
		<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
		<p>This is the token: ${tokenResetPassword}</p>`,
	};
};
