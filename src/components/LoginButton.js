import React, { Component } from "react";
import { Button } from "reactstrap";

export default function LoginButton(props) {
	return (
		<Button color="primary" onClick={props.authButtonMethod}>
			Login
		</Button>
	);
}
