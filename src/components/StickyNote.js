import React, { Component } from "react";
import { Container } from "reactstrap";

export default class StickyNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.user.id,
			canUpdate: true,
		};
		this.updateNote = this.updateNote.bind(this);
	}

	componentDidUpdate() {
		if (this.props.isAuthenticated && this.state.canUpdate) {
			if (this.state.userId !== this.props.user.id) {
				this.setState({
					userId: this.props.user.id,
				});
				fetch("/api/allUsers")
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						this.checkNewUser(data);
						this.getNotes();
					})
					.catch((err) => {
						console.log(err);
					});
			}
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
		if (this.props.isAuthenticated && this.state.canUpdate) {
			fetch(`/api/notes/${this.props.user.id}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					// console.log(data);
					document.querySelector("#stickyNote").value =
						data[0].userNotes;
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	updateNote() {
		if (this.props.isAuthenticated && this.state.canUpdate) {
			// console.log("Waiting to post updated note");
			this.setState({ canUpdate: false });
			setTimeout(
				function () {
					fetch("/api/notes", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							note: document.querySelector("#stickyNote").value,
							userId: this.props.user.id,
						}),
					}).catch((err) => {
						console.log(err);
					});
					// console.log("Posting updated note");
					this.setState({ canUpdate: true });
				}.bind(this),
				5000
			);
		}
	}

	render() {
		return (
			<Container>
				<textarea
					name="stickyNote"
					id="stickyNote"
					placeholder="Sticky Note"
					onChange={this.updateNote}
				/>
			</Container>
		);
	}
}
