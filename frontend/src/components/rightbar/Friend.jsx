import React from "react";
import { useContext, useEffect, useState } from "react";

import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";

function Friend({ friend, currentUser }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	console.log(currentUser);

	const { user, dispatch } = useContext(AuthContext);

	const [followed, setFollowed] = useState(
		currentUser.followings.includes(friend._id)
	);
	console.log(
		"__________________________________________________________________________"
	);
	console.log(followed);
	const handleClick = async () => {
		console.log("followed clicked");
		console.log(friend);
		if (currentUser)
			try {
				if (followed) {
					await axios.put(`/users/${friend._id}/unfollow`, {
						userId: currentUser._id,
					});
					dispatch({ type: "UNFOLLOW", payload: friend._id });
				} else {
					// await axios.put(`/users/${user._id}/follow`, {
					await axios.put(`/users/${friend._id}/follow`, {
						userId: currentUser._id,
					});
					dispatch({ type: "FOLLOW", payload: friend._id });

					await axios.post("/conversations/", {
						senderId: friend._id,
						receiverId: currentUser._id,
					});
				}
				setFollowed(!followed);
			} catch (err) {
				console.log("sorry eror in followed clicked");
			}
	};
	return (
		<div className="friendu">
			<div
			// to={"/profile/" + friend.username}
			// style={{ textDecoration: "none" }}
			>
				{/* <div className="rightbarFollowing">
								<img
									src={
										friend.profilePicture
											? PF + friend.profilePicture
											: PF + "person/noAvatar.png"
									}
									alt=""
									className="rightbarFollowingImg"
								/>
								<span className="rightbarFollowingName">{friend.username}</span>
							</div> */}
				<div
					className="sidebarchat"
					style={{
						justifyContent: "space-between",
					}}
				>
					<Link
						to={"/profile/" + friend.username}
						style={{ textDecoration: "none" }}
					>
						<Avatar
							src={
								friend.profilePicture
									? PF + friend.profilePicture
									: PF + "person/noAvatar.png"
							}
						/>
						<div
							className="sidebarchat_info"
							style={{
								flex: 1,
							}}
						>
							<h2>{friend.username}</h2>
						</div>
					</Link>

					<div>
						{/* {user.username !== currentUser.username && ( */}
						<button
							// className="rightbarFollowButton"
							style={{
								display: "flex",
								alignItems: "center",
								borderRadius: "1vh",
								background: "#52ae52",
								fontSize: "1.3vh",
								zIndex: 10000,
							}}
							// onClick={async () => {
							// 	// await setr(friend._id);
							// 	handleClick(friend);
							// 	// setFollowed(!followed);
							// }}
							onClick={handleClick}
						>
							{followed ? "Unfollow" : "Follow"}
							{followed ? <Remove /> : <Add />}
						</button>
						{/* )} */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Friend;
