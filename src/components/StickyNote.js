import React, { Component } from "react";
import { Container } from "reactstrap";

export default class StickyNote extends Component {
	componentDidMount() {
		fetch("/api/allUsers")
			.then((res) => {
				res.json();
			})
			.then((users) => {
				console.log(users);
			});
	}

	render() {
		return (
			<Container>
				<textarea
					name="stickyNote"
					id="stickyNote"
					placeholder="Sticky Note"
				/>
			</Container>
		);
	}
}
