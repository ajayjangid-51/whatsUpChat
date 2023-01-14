import { Avatar } from "@material-ui/core";
import React from "react";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../apiCalls";

function Navbar() {
	const { user, isFetching, dispatch } = useContext(AuthContext);

	return (
		<div
			className="navbar"
			style={{
				display: "flex",
				alignItems: "center",
				width: "100%",
				// border: "2px solid",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<div
				className="navbarc1"
				style={{
					display: "flex",
					alignItems: "center",
					width: "10vw",
					justifyContent: "space-between",
				}}
			>
				<Avatar src="favicon.ico" /> whats'UpChat
			</div>
			<div className="navbarc2">
				{user && (
					<button
						onClick={() => {
							localStorage.removeItem("user");
							logout(dispatch);
						}}
						title="logout"
					>
						logout
					</button>
				)}
			</div>
		</div>
	);
}

export default Navbar;
