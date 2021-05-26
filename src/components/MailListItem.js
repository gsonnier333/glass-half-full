import React, { Component } from "react";
import { Row, Col } from "reactstrap";

export default class MailListItem extends Component {
	render() {
		return (
			<Row className="mailListItem">
				<Col>
					<div>
						<span className="mailListItemSubject">
							Email Subject{" "}
						</span>
						from Sender
					</div>

					<p>Email preview</p>
				</Col>
			</Row>
		);
	}
}
