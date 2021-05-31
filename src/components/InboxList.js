import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default class InboxList extends Component {
	//this will one day display a user's different inboxes. For now, however, it only displays the login and logout buttons
	render() {
		// if (this.props.isAuthenticated) {
		// 	//console.log("Authenticated");
		// 	//console.log(this.props.user);
		// 	return <h1>{this.props.user.displayName}</h1>;
		// }
		return (
			<Container id="inboxList">
				<Row>
					<Col>
						{this.props.isAuthenticated ? (
							<h1>{this.props.user.displayName}</h1>
						) : (
							<div />
						)}
						<LoginButton
							authButtonMethod={this.props.loginMethod}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<LogoutButton logoutMethod={this.props.logoutMethod} />
					</Col>
				</Row>
			</Container>
		);
	}
}
