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

class App extends Component {
	render() {
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
				<InboxList />
				<StickyNote />
				<MailList />
				<MailView />
			</Container>
		);
	}
}

export default withAuthProvider(App);
