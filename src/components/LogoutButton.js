import React, { Component } from "react";
import { Button } from "reactstrap";

export default function LogoutButton(props) {
	return (
		<Button color="primary" onClick={props.logoutMethod}>
			Logout
		</Button>
	);
}
