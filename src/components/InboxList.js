import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

export default class InboxList extends Component {
	render() {
		if (this.props.isAuthenticated) {
			console.log("Authenticated");
			console.log(this.props.user);
			return <h1>{this.props.user.displayName}</h1>;
		}
		return (
			<Container id="inboxList">
				<Row>
					<Col>Inbox</Col>
				</Row>
				<Row>
					<Col>Outbox</Col>
				</Row>
			</Container>
		);
	}
}
