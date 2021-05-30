import React, { Component } from "react";
import { Container } from "reactstrap";

export default class StickyNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.user.id,
		};
	}

	componentDidMount() {
		fetch("/api/allUsers")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (this.props.isAuthenticated) {
					this.checkNewUser(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidUpdate() {
		if (this.props.isAuthenticated) {
			if (this.state.userId !== this.props.user.id) {
				this.setState({
					userId: this.props.user.id,
				});
			}
			fetch("/api/allUsers")
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					this.checkNewUser(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	checkNewUser(users) {
		let newUser = true; //assume this user is new until proven otherwise
		users.forEach((user) => {
			if (this.props.user.id === user.userId) {
				newUser = false;
			}
		});

		if (newUser) {
			this.addUser(this.props.user);
		} else {
			this.getNotes();
		}

		return newUser;
	}

	addUser(user) {
		fetch("/api/newUser", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: user.id }),
		}).catch((err) => {
			console.log(err);
		});
	}

	getNotes() {
		if (this.props.isAuthenticated) {
			fetch(`/api/notes/${this.props.user.id}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
