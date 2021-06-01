export const config = {
	appId: process.env.REACT_APP_APP_ID,
	redirectUri: `https://glass-half-full.herokuapp.com/`,
	scopes: ["user.read", "mail.readwrite"],
};
