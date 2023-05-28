const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

app.use(
	"/serverImages",
	express.static(path.join(__dirname, "public/otherimages"))
);

// middleware:-
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/otherimages");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
		// cb(null, "abc.png");
		// cb(null, req.body.file.originalname);
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

// const upload = multer({ storage: storage });
const upload = multer({ dest: "public/other/images" });

app.post("/server/upload", upload.single("file"), (req, res) => {
	try {
		// console.log(req);
		// console.log("HEI hellooo______");
		return res.status(200).json("File uploded successfully");
	} catch (error) {
		console.log("err in uploaded_______________________");
		console.error(error);
	}
});

app.get("/", (req, res) => {
	res.send("hi welcome... only upload server");
});

app.listen(8800, () => {
	console.log("Backend server is running!");
});
