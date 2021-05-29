import React, { Component } from "react";
import { Row, Col } from "reactstrap";

export default class MailListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mailId: props.item.id,
			focused: props.focused,
		};
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect() {
		this.setState(() => ({
			focused: true,
		}));
		//console.log(this.props.item.subject);
		this.props.select(this.state.mailId);
	}
	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				focused: this.props.focused,
			});
		}
	}
	render() {
		//console.log(this.props);
		return (
			<Row
				className={`mailListItem ${
					this.state.focused ? "focused" : "unfocused"
				}`}
				onClick={this.handleSelect}
			>
				<Col>
					<div className="mailListItemSubject">
						{this.props.item.subject.substring(0, 45) + "..."}
					</div>
					<div className="mailListItemSender">
						from {this.props.item.from.emailAddress.name}
					</div>

					<p className="mailListItemBody">
						{this.props.item.bodyPreview.substring(0, 110) + "..."}
					</p>
				</Col>
			</Row>
		);
	}
}
