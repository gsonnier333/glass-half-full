import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

export default class InboxList extends Component {
	render() {
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
