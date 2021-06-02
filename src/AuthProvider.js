import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { config } from "./config";
import { getUserDetails, getMail } from "./GraphService";

// export class AuthComponentProps {
// 	error;
// 	isAuthenticated;
// 	user;
// 	login;
// 	logout;
// 	getAccessToken;
// 	setError;
// }

// class AuthProviderState {
// 	error;
// 	isAuthenticated;
// 	user;
// }

export default function withAuthProvider(WrappedComponent) {
	return class extends React.Component {
		publicClientApplication;
		constructor(props) {
			super(props);
			this.state = {
				error: null,
				isAuthenticated: false,
				user: "",
			};

			this.publicClientApplication = new PublicClientApplication({
				auth: {
					clientId: process.env.REACT_APP_APP_ID,
					redirectUri: config.redirectUri,
				},
				cache: {
					cacheLocation: "sessionStorage",
					storeAuthStateInCookie: true,
				},
			});
		}

		componentDidMount() {
			this.login();
			const accounts = this.publicClientApplication.getAllAccounts();

			if (accounts && accounts.length > 0) {
				this.getUserProfile();
			}
		}

		render() {
			return (
				<WrappedComponent
					error={this.state.error}
					isAuthenticated={this.state.isAuthenticated}
					user={this.state.user}
					mail={this.state.mail}
					login={() => this.login()}
					logout={() => this.logout()}
					getAccessToken={(scopes) => this.getAccessToken(scopes)}
					setError={(message, debug) =>
						this.setErrorMessage(message, debug)
					}
					{...this.props}
				/>
			);
		}

		// async refreshMail() {
		// 	try {
		// 		await this.getUserMail();
		// 	} catch (err) {
		// 		this.setState({
		// 			isAuthenticated: false,
		// 			mail: ["ERROR"],
		// 			error: this.normalizeError(err),
		// 		});
		// 	}
		// }

		login() {
			try {
				this.publicClientApplication
					.handleRedirectPromise()
					.then((token) => {
						//get a token response
						if (!token) {
							//if we don't get one
							const accounts =
								this.publicClientApplication.getAllAccounts();
							console.log(accounts);
							if (accounts.length === 0) {
								//if we're not already logged in
								console.log("Logging in with loginRedirect()");
								this.publicClientApplication.loginRedirect({
									scopes: config.scopes,
									prompt: "select_account",
								});
							}
						} else {
							//if we do get a token
							console.log(token);
							this.getUserProfile();
						}
					});
			} catch (err) {
				console.log(err);
				this.setState({
					isAuthenticated: false,
					user: "",
					error: this.normalizeError(err),
				});
			}
		}

		logout() {
			this.publicClientApplication.logoutRedirect();
		}

		async getAccessToken(scopes) {
			console.log("Getting access token");
			try {
				const accounts = this.publicClientApplication.getAllAccounts();
				if (accounts.length <= 0) throw new Error("login_required");
				console.log("Getting result");
				let silentResult =
					await this.publicClientApplication.acquireTokenSilent({
						scopes: scopes,
						account: accounts[0],
					});
				console.log(silentResult.accessToken);
				return silentResult.accessToken;
			} catch (err) {
				console.log(err);
				if (this.isInteractionRequired(err)) {
					let interractiveResult =
						await this.publicClientApplication.acquireTokenSilent({
							scopes: scopes,
						});
					console.log(interractiveResult.accessToken);
					return interractiveResult.accessToken;
				} else {
					console.log("Interaction not required, error");
					throw err;
				}
			}
		}

		async getUserProfile() {
			console.log("Getting profile");
			try {
				let accessToken = await this.getAccessToken(config.scopes);
				if (accessToken) {
					console.log(accessToken);
					let user = await getUserDetails(accessToken);
					let mail = await getMail(accessToken);
					let messages = mail.value;
					this.setState({
						isAuthenticated: true,
						user: {
							...user,
						},
						mail: messages,
						error: {
							message: "Access token:",
							debug: accessToken,
						},
					});
				}
			} catch (err) {
				console.log(err);
				this.setState({
					isAuthenticated: false,
					user: "",
					mail: "",
					error: this.normalizeError(err),
				});
			}
		}

		// async getUserMail() {
		// 	try {
		// 		let accessToken = await this.getAccessToken(config.scopes);
		// 		if (accessToken) {
		// 			let mail = await getMail(accessToken);
		// 			this.setState({
		// 				isAuthenticated: true,
		// 				mail: [mail[0], mail[1], mail[2]],
		// 				error: {
		// 					message: "Access token:",
		// 					debug: accessToken,
		// 				},
		// 			});
		// 		}
		// 	} catch (err) {
		// 		this.setState({
		// 			isAuthenticated: false,
		// 			user: "how ya do",
		// 			error: this.normalizeError(err),
		// 		});
		// 	}
		// }

		setErrorMessage(message, debug) {
			this.setState({
				error: {
					message: message,
					debug: debug,
				},
			});
		}

		normalizeError(error) {
			let normalizedError = {};
			if (typeof error === "string") {
				let errParts = error.split("|");
				normalizedError =
					errParts.length > 1
						? { message: errParts[1], debug: errParts[0] }
						: { message: error };
			} else {
				normalizedError = {
					message: error.message,
					debug: JSON.stringify(error),
				};
			}
			return normalizedError;
		}

		isInteractionRequired(error) {
			console.log("isInteractionRequired called");
			if (!error.message || error.message.length <= 0) {
				console.log("isInteractionRequired returning false");
				return false;
			}

			return (
				error.message.indexOf("consent_required") > -1 ||
				error.message.indexOf("interaction_required") > -1 ||
				error.message.indexOf("login_required") > -1 ||
				error.message.indexOf("no_account_in_silent_request") > -1
			);
		}
	};
}
