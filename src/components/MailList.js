import React, { Component } from "react";
import MailListItem from "./MailListItem";
import { Container } from "reactstrap";

export default class MailList extends Component {
	render() {
		if (this.props.isAuthenticated) {
			console.log(this.props.mail[0]);
			return (
				<Container id="mailList">
					{this.props.mail.map((message) => {
						return <MailListItem item={message} />;
					})}
				</Container>
			);
		}

		return <Container id="mailList"></Container>;
	}
}
