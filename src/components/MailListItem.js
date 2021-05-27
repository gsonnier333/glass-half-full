import React, { Component } from "react";
import { Row, Col } from "reactstrap";

export default class MailListItem extends Component {
	render() {
		console.log(this.props);
		return (
			<Row className="mailListItem">
				<Col>
					<div className="mailListItemSubject">
						{this.props.item.subject.substring(0, 45) + "..."}
					</div>
					<div className="mailListItemSender">
						from {this.props.item.from.emailAddress.name}
					</div>

					<p className="mailListItemBody">
						{this.props.item.bodyPreview.substring(0, 110) + "..."}
					</p>
				</Col>
			</Row>
		);
	}
}
