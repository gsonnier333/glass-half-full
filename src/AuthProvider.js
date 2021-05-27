import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { config } from "./config";

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
				user: {},
			};

			this.publicClientApplication = new PublicClientApplication({
				auth: {
					clientId: config.appId,
					redirectUri: config.redirectUri,
				},
				cache: {
					cacheLocation: "sessionStorage",
					storeAuthStateInCookie: true,
				},
			});
		}

		componentDidMount() {
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

		async login() {
			try {
				await this.publicClientApplication.loginPopup({
					scopes: config.scopes,
					prompt: "select_account",
				});

				await this.getUserProfile();
			} catch (err) {
				this.setState({
					isAuthenticated: false,
					user: {},
					error: this.normalizeError(err),
				});
			}
		}

		logoutRequest = {
			account:
				this.publicClientApplication.getAccountByHomeId(homeAccountId),
		};

		logout() {
			this.publicClientApplication.logoutRedirect(this.logoutRequest);
		}

		async getAccessToken(scopes) {
			try {
				const accounts = this.publicClientApplication.getAllAccounts();
				if (accounts.length <= 0) throw new Error("login_required");

				let silentResult =
					await this.publicClientApplication.acquireTokenSilent({
						scopes: scopes,
						account: accounts[0],
					});
				return silentResult.accessToken;
			} catch (err) {
				if (this.isInteractionRequired(err)) {
					let interractiveResult =
						await this.publicClientApplication.acquireTokenPopup({
							scopes: scopes,
						});
					return interractiveResult.accessToken;
				} else {
					throw err;
				}
			}
		}

		async getUserProfile() {
			try {
				let accessToken = await this.getAccessToken(config.scopes);
				if (accessToken) {
					this.setState({
						isAuthenticated: true,
						error: {
							message: "Access token:",
							debug: accessToken,
						},
					});
				}
			} catch (err) {
				this.setState({
					isAuthenticated: false,
					user: {},
					error: this.normalizeError(err),
				});
			}
		}

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
			if (!error.message || error.message.length <= 0) {
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
