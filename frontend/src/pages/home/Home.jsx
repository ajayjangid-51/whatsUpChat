import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Chat } from "@material-ui/icons";
import Navbar from "../../components/topbar/Navbar";

export default function Home() {
	const { user, dispatch } = useContext(AuthContext);
	console.log(user);
	return (
		<div
			className="home"
			style={{
				width: "100%",
			}}
		>
			{/* <Topbar /> */}
			<div
				className="home_navbar"
				style={{
					// border: "1px solid",
					height: "9vh",
					background: "#161313",
					color: "white",
					display: "flex",
					alignItems: "center",
					padding: "0vh 4vh",
				}}
			>
				<Navbar />
			</div>
			<div className="homeContainer">
				{/* <Sidebar /> */}
				{/* {user && <Feed />} */}
				{/* {user && <Feed />} */}
				<Feed />
				{/* <Rightbar user={{ k1: "v1", k2: "v2" }} /> */}
				<Rightbar user={user} />
			</div>
		</div>
	);
}
