import React, { Component } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Navbar, Nav, NavItem } from "reactstrap";

export default class TopBar extends Component {
	render() {
		return (
			<Navbar bg="light" expand="false" className="customNavbar">
				<Nav className="mr-auto">
					{this.props.isAuthenticated ? (
						<LogoutButton logoutMethod={this.props.logoutMethod} />
					) : (
						<LoginButton
							authButtonMethod={this.props.loginMethod}
						/>
					)}
					<h4>Glass Half Full</h4>
				</Nav>
			</Navbar>
		);
	}
}
