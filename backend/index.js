const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");

dotenv.config();

mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => {
		console.log("Connected to MongoDB");
	}
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});
// notepoint: apn multipart-form  meh apna saat meh "string key-values" nhi daal sktehh hai, thus toh mtlb apnko yeh fileupload and file  related data alg-alg server pe bhejna hota hai.. like this:- (mtlb apn yeh kaam http-client(mtlb postman ya vscode-rapidapi se nhi kr sktehh hai.))
/* 
// like this:-
const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  }; */

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	try {
		return res.status(200).json("File uploded successfully");
	} catch (error) {
		console.error(error);
	}
});

app.get("/", (req, res) => {
	res.send("hi welcome...");
});

app.get("/api", (req, res) => {
	res.send("hi i am h");
});
app.get("/api/h", (req, res) => {
	res.send("hi i am h");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
	console.log("Backend server is running!");
});
