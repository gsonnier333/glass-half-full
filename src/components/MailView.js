import React, { Component } from "react";
import { Container } from "reactstrap";

export default class MailView extends Component {
	render() {
		return (
			<Container
				id="mailView"
				dangerouslySetInnerHTML={
					this.props.message
						? { __html: this.props.message.body.content }
						: { __html: "" }
				}
			></Container>
		);
	}
}
