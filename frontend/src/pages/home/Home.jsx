import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Home() {
	const { user, dispatch } = useContext(AuthContext);
	// console.log(user);
	return (
		<>
			<Topbar />
			<div className="homeContainer">
				<Sidebar />
				<Feed />
				{/* <Rightbar user={{ k1: "v1", k2: "v2" }} /> */}
				<Rightbar user={user} />
			</div>
		</>
	);
}
