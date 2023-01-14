import "./profile.css";
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function Profile({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<>
			{/* <Topbar /> */}
			<div className="profile">
				{/* <Sidebar /> */}
				<div className="profileRight">
					<div className="ProfileRight_top">
						<ArrowBackRoundedIcon />
						Profile
					</div>
					<div className="profileCover">
						<img
							className="profileCoverImg"
							src={
								user?.coverPicture
									? PF + user.coverPicture
									: PF + "person/noCover.png"
							}
							alt=""
						/>
						<img
							className="profileUserImg"
							src={
								user?.profilePicture
									? PF + user.profilePicture
									: PF + "person/noAvatar.png"
							}
							alt=""
						/>
					</div>
					<div className="profileInfo">
						<h4 className="profileInfoName">Welcome {user?.username}!</h4>
						<span className="profileInfoDesc">about you:- {user?.desc}</span>
					</div>
					{/* <div className="profileRightBottom">
						<Feed username={username} />
						<Rightbar user={user} />
					</div> */}
				</div>
			</div>
		</>
	);
}
