require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoute.js");
const postRoutes = require("./routes/postRoute.js");
const commentRoutes = require("./routes/commentRoutes.js");
const utilRoutes = require("./routes/utilRoutes.js");

const path = require("path");

app.use(
  cors({
    origin: ["https://dtunite.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", utilRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;
app.get("/", (req, res) => {
  res.send("Welcome to the backend of DTU Reddit");
});

async function connectdb() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
}
connectdb();
app.use((req, res) => {
  res.status(404).render("pageNotFound.ejs");
});
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});
app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
