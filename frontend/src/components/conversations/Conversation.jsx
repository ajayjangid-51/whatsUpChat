import axios from "axios";
import { Avatar } from "@material-ui/core";

import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({
	conversation,
	currentUser,
	// setrequestedUser,
	// gotUser,
}) {
	const [user, setUser] = useState(null);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const friendId = conversation.members.find((m) => m !== currentUser._id);

		const getUser = async () => {
			try {
				const res = await axios("/users?userId=" + friendId);
				setUser(res.data);
				// setrequestedUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);

	/* return (
		<div className="conversation">
			<img
				className="conversationImg"
				src={
					user?.profilePicture
						? PF + user.profilePicture
						: PF + "person/noAvatar.png"
				}
				alt=""
			/>
			<span className="conversationName">{user?.username}</span>
		</div>
	); */
	return (
		<div className="sidebarchat">
			<Avatar
				src={
					user?.profilePicture
						? PF + user.profilePicture
						: PF + "person/noAvatar.png"
				}
			/>
			<div className="sidebarchat_info">
				<h2>{user?.username}</h2>
				<p>lastmessage</p>
			</div>
		</div>
	);
}
