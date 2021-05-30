import logo from "./logo.svg";
import "./App.css";
import withAuthProvider from "./AuthProvider";
import React, { Component } from "react";
import ErrorMessage from "./components/ErrorMessage";

import { Container } from "reactstrap";
import MailView from "./components/MailView";
import MailList from "./components/MailList";
import InboxList from "./components/InboxList";
import StickyNote from "./components/StickyNote";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusedMailId: null, //this will be the id of the mail item being rendered to the MailView component. null when none selected
			focusedMessage: null, //this will be the contents of the mail item being rendered to the MailView component
		};
		this.viewMessage = this.viewMessage.bind(this);
	}

	viewMessage(id) {
		let message = null;
		this.props.mail.forEach((m) => {
			if (m.id === id) {
				message = m;
			}
		});
		if (message === null) {
			console.log("Error selecting message");
		} else {
			this.setState(() => ({
				focusedMailId: id,
				focusedMessage: message,
			}));
			//console.log(message);
		}
	}

	render() {
		//console.log(this.props);
		let error = null;
		if (this.props.error) {
			error = (
				<ErrorMessage
					message={this.props.error.message}
					debug={this.props.error.debug}
				/>
			);
		}
		return (
			<Container fluid={true}>
				<LoginButton authButtonMethod={this.props.login} />
				<LogoutButton logoutMethod={this.props.logout} />
				<InboxList
					user={this.props.user}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<StickyNote
					user={this.props.user}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<MailList
					mail={this.props.mail}
					isAuthenticated={this.props.isAuthenticated}
					view={this.viewMessage}
				/>
				<MailView message={this.state.focusedMessage} />
			</Container>
		);
	}
}

export default withAuthProvider(App);
