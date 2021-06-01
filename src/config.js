export const config = {
	appId: process.env.APP_ID,
	redirectUri: `https://glass-half-full.herokuapp.com/`,
	scopes: ["user.read", "mail.readwrite"],
};
