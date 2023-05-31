import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Register from "../register/Register";
import { useState } from "react";

export default function Login() {
	const [signin, setSignin] = useState(true);
	const email = useRef();
	const password = useRef();
	const history = useHistory();
	const { isFetching, dispatch } = useContext(AuthContext);

	const handleClick = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};

	// return <h1>hi hello hwielhlg eij;lagj;leijg;aelij;l</h1>;
	return !signin ? (
		<Register setSignin={setSignin} />
	) : (
		<div className="logins">
			<div className="loginWrapper">
				{/* <div className="loginLeft">
	<h3 className="loginLogo">Whats'up</h3>
	<span className="loginDesc">
		Connect with Family and Friends on Brand New! Whatsup Chat.
	</span>
</div> */}
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input
							placeholder="icode@gmail.com"
							type="email"
							required
							className="loginInput"
							ref={email}
						/>
						<input
							placeholder="abcabc"
							type="password"
							required
							minLength="6"
							className="loginInput"
							ref={password}
						/>
						<button className="loginButton" type="submit" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress color="white" size="20px" />
							) : (
								"Log In"
							)}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<button
							className="loginRegisterButton"
							onClick={() => {
								// history.push("/register");
								setSignin(false);
							}}
						>
							{isFetching ? (
								<CircularProgress color="white" size="20px" />
							) : (
								"Sign up"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
