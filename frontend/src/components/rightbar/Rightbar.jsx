import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { Chat } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ContactsIcon from "@mui/icons-material/Contacts";
import Login from "../../pages/login/Login";

export default function Rightbar({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState([]);
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?.id)
	);
	// const [p1, setp1] = useState("yellow");

	useEffect(() => {
		const getFriends = async () => {
			try {
				const friendList = await axios.get("/users/friends/" + user._id);
				setFriends(friendList.data);
			} catch (err) {
				console.log(err);
			}
		};
		getFriends();
	}, [user]);

	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put(`/users/${user._id}/unfollow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				await axios.put(`/users/${user._id}/follow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "FOLLOW", payload: user._id });
			}
			setFollowed(!followed);
		} catch (err) {}
	};

	const HomeRightbar = () => {
		return (
			<>
				<div className="birthdayContainer">
					<img className="birthdayImg" src="assets/gift.png" alt="" />
					<span className="birthdayText">
						<b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
					</span>
				</div>
				<img className="rightbarAd" src="assets/ad.png" alt="" />
				<h4 className="rightbarTitle">Online Friends</h4>
				<ul className="rightbarFriendList">
					{Users.map((u) => (
						<Online key={u.id} user={u} />
					))}
				</ul>
			</>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				<h4
					className="rightbarTitle"
					style={{
						display: "flex",
					}}
				>
					<AutoGraphIcon /> User Info
				</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City:</span>
						<span className="rightbarInfoValue">{user.city}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">From:</span>
						<span className="rightbarInfoValue">{user.from}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship:</span>
						<span className="rightbarInfoValue">
							{user.relationship === 1
								? "Single"
								: user.relationship === 1
								? "Married"
								: "-"}
						</span>
					</div>
				</div>
				<h4
					className="rightbarTitle"
					style={{
						display: "flex",
					}}
				>
					<ContactsIcon /> Contacts
				</h4>
				<div className="rightbarFollowings">
					{friends.map((friend) => (
						<Link
							to={"/profile/" + friend.username}
							style={{ textDecoration: "none" }}
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
										}}
										onClick={handleClick}
									>
										{followed ? "Unfollow" : "Follow"}
										{followed ? <Remove /> : <Add />}
									</button>
									{/* )} */}
								</div>
							</div>
						</Link>
					))}
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{/* {user ? <ProfileRightbar /> : <HomeRightbar />} */}
				<div
					className="rightbarWrapperc1"
					// style={{
					// 	height: "10vh",
					// 	display: "flex",
					// 	background: "rgb(187, 187, 187)",
					// 	borderRadius: "1vh",
					// 	padding: "1vh",
					// 	alignItems: "center",
					// 	justifyContent: "center",
					// }}
				>
					<Link
						to={"/messenger"}
						style={{
							"text-decoration": "none",
							color: "black",
							"&:visited": {
								color: "black !important",
							},
						}}
					>
						<span
							style={{
								marginRight: "1vw",
								fontWeight: "600",
							}}
						>
							Switch to Whatsup Chat
						</span>
						<IconButton>
							<Chat />
						</IconButton>
					</Link>
				</div>
				{/* <div className="rightbarWrapperc2">{user && <ProfileRightbar />}</div> */}
				<div className="rightbarWrapperc2">
					{/* {user ? <ProfileRightbar /> : <Login />} */}
					<Login />
				</div>
			</div>
		</div>
	);
}
