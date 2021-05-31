import React, { Component } from "react";
import { Button } from "reactstrap";

export default function LogoutButton(props) {
	return (
		<Button onClick={props.logoutMethod} id="logButton">
			Logout
		</Button>
	);
}
