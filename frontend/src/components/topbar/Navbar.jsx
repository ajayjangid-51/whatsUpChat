import { Avatar } from "@material-ui/core";
import React from "react";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../apiCalls";
import SettingsPowerIcon from "@mui/icons-material/SettingsPower";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import VideoCameraFrontRoundedIcon from "@mui/icons-material/VideoCameraFrontRounded";

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
					width: "9vw",
					justifyContent: "space-between",
				}}
			>
				<Avatar src="favicon.ico" />
				<h3 style={{ color: "rgb(84, 178, 86)" }}>Whats'Up</h3>
			</div>
			<div
				className="navbarc2"
				style={{
					backgroundColor: "black",
					flex: "0.20",
					backgroundColor: "black",
					justifyContent: "space-between",
					display: "flex",
					cursor: "pointer",
				}}
			>
				<AdminPanelSettingsIcon fontSize="large" color="rgb(10,5,2)" />
				<PeopleAltIcon fontSize="large" color="rgb(184, 90, 31)" />
				<PhoneForwardedIcon fontSize="large" color="rgb(10,5,2)" />
				<VideoCameraFrontRoundedIcon fontSize="large" color="rgb(10,5,2)" />
				{user && (
					// <button style={{ backgroundColor: "black" }}>
					// 	{/* logout */}

					// </button>
					<SettingsPowerIcon
						color="success"
						// sx={{ backgroundColor: "black" }}
						fontSize="large"
						onClick={() => {
							localStorage.removeItem("user");
							logout(dispatch);
						}}
						title="logout"
					/>
				)}
			</div>
		</div>
	);
}

export default Navbar;
