import logo from "./logo.svg";
import "./App.css";
import { Container } from "reactstrap";
import MailView from "./components/MailView";
import MailList from "./components/MailList";
import InboxList from "./components/InboxList";
import StickyNote from "./components/StickyNote";

function App() {
	return (
		<Container fluid={true}>
			<InboxList />
			<StickyNote />
			<MailList />
			<MailView />
		</Container>
	);
}

export default App;
