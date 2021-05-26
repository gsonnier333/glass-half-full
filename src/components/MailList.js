import React, { Component } from "react";
import MailListItem from "./MailListItem";
import { Container } from "reactstrap";

export default class MailList extends Component {
	render() {
		return (
			<Container id="mailList">
				<MailListItem />
				<MailListItem />
				<MailListItem />
			</Container>
		);
	}
}
