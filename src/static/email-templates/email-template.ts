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
	  <p>this is your token ${token}</p>
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
