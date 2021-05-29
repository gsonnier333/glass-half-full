import React, { Component } from "react";
import MailListItem from "./MailListItem";
import { Container } from "reactstrap";

export default class MailList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusedMailId: null,
		};
		this.selectMessage = this.selectMessage.bind(this);
	}

	selectMessage(id) {
		this.setState({
			focusedMailId: id,
		});
		//console.log(id);
		this.props.view(id); //passes the id back up to App.js to be used in the MailView window
	}

	render() {
		if (this.props.isAuthenticated) {
			//console.log(this.props.mail[0]);
			return (
				<Container id="mailList">
					{this.props.mail.map((message) => {
						let isFocused = false;
						if (this.state.focusedMailId === message.id) {
							isFocused = true;
						}
						return (
							<MailListItem
								item={message}
								select={this.selectMessage}
								key={message.id}
								focused={isFocused}
							/>
						);
					})}
				</Container>
			);
		}

		return <Container id="mailList"></Container>;
	}
}
