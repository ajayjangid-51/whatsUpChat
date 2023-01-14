import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import Profile from "../profile/Profile";

import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { useHistory } from "react-router-dom";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { Redirect } from "react-router-dom";

export default function Messenger() {
	const [chatsearchvalue, setChatsearchvalue] = useState("");
	const [requestedUser, setrequestedUser] = useState("");
	const [show, setshow] = useState(false);
	const [showProfile, setShowProfile] = useState(false);

	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const socket = useRef();
	const { user } = useContext(AuthContext);
	const scrollRef = useRef();
	const history = useHistory();

	// when the messenger-componentpage loads first time.
	useEffect(() => {
		// so niche means ki apnne socketio ko yeh boldiya ki if you get "getMessage"-event then you have to call "setArrivalMessage" everytime
		// inshort we have tell to socketio ki tereko ess event pe yeh kaam krna hai.
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	//
	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(
				user.followings.filter((f) => users.some((u) => u.userId === f))
				// [user._Id, "63b5b06f3f1c5f3c2cd7f694"]
			);
		});
	}, [user]);

	// when userId changes then bring all conversions-groups of that user. (and notepoint ki yeh "user"-statevariable is global-state-variable hai , mtlb globally kisi bhi component meh yeh "user"-variable change hota hai then yeh apna messenger wala useEffect-hookfunction call  hojayega. )
	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("/conversations/" + user._id);
				setConversations(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user._id]);

	// here mtlb when specific-group is clicked then currentChat-state is updated with that activated-group and when currentchat-state changes then that-group's-messages are exracted and assigned into Messages-statevariable.
	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/messages/" + currentChat?._id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	// if messages comes into picture then apnko automatic scroll toh krna hi hogana..
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		});

		try {
			const res = await axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};
	const handleinput = (e) => {
		setChatsearchvalue(e.target.value);
		if (chatsearchvalue === "") {
			setshow(false);
		} else setshow(true);
	};
	// const filteredChats = chatdetails.filter((e) => {
	// 	return (
	// 		e.name.toLowerCase().includes(chatsearchvalue.toLowerCase()) ||
	// 		e.lastmsg.toLowerCase().includes(chatsearchvalue.toLowerCase())
	// 	);
	// });

	const searchlist = () => {
		// console.log("searchlist-function is called");
		// if (show) {
		// 	if (filteredChats.length == 0) {
		// 		return <p>No chat found</p>;
		// 	} else {
		// 		// return <SidebarChat img={e.img} name={e.name} lastmsg={e.lastmsg} />;
		// 		return filteredChats.map((e) => (
		// 			<SidebarChat img={e.img} name={e.name} lastmsg={e.lastmsg} />
		// 		));
		// 	}
		// }
	};

	return (
		<>
			{/* <Topbar /> */}
			<div className="messenger">
				{showProfile ? (
					<div className="chatMenu" onClick={() => setShowProfile(false)}>
						<Profile user={user} />
					</div>
				) : (
					<div className="chatMenu">
						<div className="sidebar_header">
							{/* <Avatar src="https://scontent.fjai1-1.fna.fbcdn.net/v/t1.0-9/95579659_251943029504450_4224608541916266496_o.jpg?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=-kEKsRy4qkkAX9qpY0s&_nc_ht=scontent.fjai1-1.fna&oh=ede61f2e7978df4d9c5f2da2a4a6b46c&oe=5F9772E5" /> */}
							{/* /> */}
							<Avatar
								src={
									process.env.PUBLIC_URL + "ajayprofilepic_circlecropped.png"
								}
								onClick={() => setShowProfile(true)}
							/>
							<div className="sidbar__headerRight">
								<IconButton
									onClick={() => {
										history.push("/");
									}}
								>
									{/* <AccessTimeIcon /> */}
									<HomeRoundedIcon />
								</IconButton>
								<IconButton>
									<ChatIcon />
								</IconButton>
								<IconButton>
									<MoreVertIcon />
								</IconButton>
							</div>
						</div>
						<div className="sidebar_search">
							<div className="sidebar__searchContainer">
								<IconButton>
									<SearchIcon />
								</IconButton>
								<input
									type="text"
									placeholder="Search Chat..."
									onChange={handleinput}
								/>
							</div>
						</div>
						<div className="chatMenuWrapper">
							{/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
							{chatsearchvalue !== ""
								? searchlist()
								: conversations.map((c) => (
										<div
											onClick={() => {
												setCurrentChat(c);
												const friendId = c.members.find((m) => m !== user._id);

												const getUser = async () => {
													try {
														const res = await axios(
															"/users?userId=" + friendId
														);
														setrequestedUser(res.data);
													} catch (err) {
														console.log(err);
													}
												};
												getUser();
											}}
										>
											<Conversation
												conversation={c}
												currentUser={user}
												// gotUser={requestedUser}
												// setrequestedUser={setrequestedUser}
											/>
										</div>
								  ))}

							{/* <h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1>
							<h1>hi</h1> */}
						</div>
					</div>
				)}
				<div className="chatBox">
					{currentChat && (
						<div className="chat_header">
							{/* <Avatar src="https://cdn.cdnparenting.com/articles/2020/01/25153910/381833377.jpg" /> */}
							<Avatar src={process.env.PUBLIC_URL + user.profilePicture} />

							<div className="chat_header_info">
								<h2>{requestedUser.username}</h2>
								<p>last seen... time</p>
							</div>
							<div className="chat_header_right">
								<IconButton>
									<MoreVertIcon />
								</IconButton>
								<IconButton>
									<AttachFileOutlinedIcon />
								</IconButton>
								<IconButton>
									<SearchOutlinedIcon />
								</IconButton>
							</div>
						</div>
					)}
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop chat_body">
									{messages.map((m) => (
										<div ref={scrollRef}>
											<Message message={m} own={m.sender === user._id} />
										</div>
									))}
								</div>
								{/* <div className="chatBoxBottom">
									<textarea
										className="chatMessageInput"
										placeholder="write something..."
										onChange={(e) => setNewMessage(e.target.value)}
										value={newMessage}
									></textarea>
									<button className="chatSubmitButton" onClick={handleSubmit}>
										Send
									</button>
								</div> */}
								<div className="chat_writemsg">
									<IconButton>
										<SentimentSatisfiedOutlinedIcon />
									</IconButton>
									<div className="chat_writemsg_input">
										<form>
											<input
												value={newMessage}
												onChange={(e) => setNewMessage(e.target.value)}
												type="text"
												placeholder="write message..."
											/>
											<button onClick={handleSubmit} type="submit">
												<SendOutlinedIcon />
											</button>
										</form>
									</div>
									<IconButton>
										<MicOutlinedIcon />
									</IconButton>
								</div>
							</>
						) : (
							<div className="noConversationText">
								{/* Open a conversation to start a chat. */}
							</div>
						)}
					</div>
				</div>
				{/* <div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline
							onlineUsers={onlineUsers}
							currentId={user._id}
							setCurrentChat={setCurrentChat}
						/>
					</div>
				</div> */}
			</div>
		</>
	);
}
