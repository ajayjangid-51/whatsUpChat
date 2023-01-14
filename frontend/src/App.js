import Home from "./pages/home/Home";
import "./App.css";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Topbar from "./components/topbar/Topbar";

function App() {
	const { isAdmin, setisAdmin } = useState(false);
	const { user } = useContext(AuthContext);
	return (
		<div className="app_body">
			<Router>
				<Switch>
					<Route exact path="/">
						{/* <Topbar /> */}

						{/* {user ? <Home /> : <Register />} */}

						<Home />
						{/* <h1>hii</h1> */}
					</Route>
					<Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
					<Route path="/register">
						{user ? <Redirect to="/" /> : <Register />}
					</Route>
					<Route path="/messenger">
						{!user ? <Redirect to="/" /> : <Messenger />}
					</Route>
					<Route path="/profile/:username">
						{!user ? <Redirect to="/" /> : <Profile />}
						{/* < Profile/> */}
					</Route>
				</Switch>
			</Router>
		</div>

		// <h1> hi</h1>
	);
}

export default App;
