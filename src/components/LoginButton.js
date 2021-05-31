import React, { Component } from "react";
import { Button } from "reactstrap";

export default function LoginButton(props) {
	return (
		<Button onClick={props.authButtonMethod} id="logButton">
			Login
		</Button>
	);
}
