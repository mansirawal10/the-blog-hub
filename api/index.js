const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const wallNotesRoute = require('./routes/wallNotes');
const multer = require("multer");
const path = require("path");
const imagesRouter = require("./routes/images");


const allowedOrigins = [
  "https://thestoryhub-blog.netlify.app", // Deployed frontend
  "http://localhost:3000", // Local development
];


dotenv.config();

// Add this BEFORE using routes!

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));

app.use(express.json());

// Middleware for serving static images
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/images", imagesRouter);



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/wallnotes", wallNotesRoute);


app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});
