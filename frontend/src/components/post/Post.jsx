import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, IconButton } from "@material-ui/core";

import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [dislike, setdisLike] = useState(2);
	const [isLiked, setIsLiked] = useState(false);
	const [isdisLiked, setdisIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (err) {}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};
	const dislikeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (err) {}
		// setLike(isLiked ? like - 1 : like + 1);
		// setIsLiked(!isLiked);
		setdisIsLiked(!isdisLiked);
	};
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
							{/* <img
								className="postProfileImg"
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "person/noAvatar.png"
								}
								alt=""
							/> */}
							<Avatar
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "person/noAvatar.png"
								}
							/>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						<IconButton>
							<MoreVert />
						</IconButton>
					</div>
				</div>
				<div className="postCenter">
					<span
						className="postText"
						style={{ fontSize: "2vh", fontWeight: "642", color: "#2d374e" }}
					>
						{post?.desc}
					</span>
					<img className="postImg" src={PF + post.img} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<IconButton>
							<ThumbUpAltRoundedIcon
								color={isLiked ? "secondary" : "primary"}
								onClick={likeHandler}
							/>
						</IconButton>

						<span className="postLikeCounter">{like}</span>
						<IconButton>
							<ThumbDownRoundedIcon
								color={isdisLiked ? "secondary" : "primary"}
								onClick={dislikeHandler}
							/>
						</IconButton>

						<span className="postLikeCounter">{dislike}</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">comments </span>

						<InsertCommentIcon />
					</div>
				</div>
			</div>
		</div>
	);
}
