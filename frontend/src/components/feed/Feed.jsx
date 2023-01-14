import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get("/posts/profile/" + username)
				: await axios.get("posts/timeline/" + user._id);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		if (user) fetchPosts();
	}, [username, user?._id]);

	return (
		// <div className="feed">
		// 	{user == null ? (
		// 		<div className="feedWrapper">
		// 			{(!username || username === user.username) && <Share />}
		// 			{posts.map((p) => (
		// 				<Post key={p._id} post={p} />
		// 			))}
		// 		</div>
		// 	) : (
		// 		<div className="feedc2">
		// 			<img src="1002693-whatsapp-4.jpg" alt="" />
		// 		</div>
		// 	)}
		// </div>

		// user == null ? <div>hi</div> : <div>bye</div>
		user ? (
			<div className="feed">
				<div className="feedWrapper">
					{(!username || username === user.username) && <Share />}
					{posts.map((p) => (
						<Post key={p._id} post={p} />
					))}
				</div>
			</div>
		) : (
			<div className="feedc2">
				<img src="1002693-whatsapp-4.jpg" alt="" />
			</div>
		)
		// <div>hi</div>
	);
}
