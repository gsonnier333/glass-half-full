export const config = {
	appId: process.env.APP_ID,
	redirectUri: `https://glass-half-full.herokuapp.com:${process.env.PORT}`,
	scopes: ["user.read", "mail.readwrite"],
};
