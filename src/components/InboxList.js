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
				<h5>Inboxes [Coming Soon]</h5>
			</Container>
		);
	}
}
