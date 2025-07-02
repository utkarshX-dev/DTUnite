require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute.js');
const postRoutes = require('./routes/postRoute.js');
const commentRoutes = require('./routes/commentRoutes.js');
const utilRoutes = require("./routes/utilRoutes.js");
const path = require('path');
const cors = require('cors');

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", utilRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use(express.static(path.join(__dirname, "public")));

const port = 8080;
const MONGO_URL= process.env.MONGO_URL;
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
  res.status(404).render('pageNotFound.ejs');
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong" });
});
app.listen(port, ()=>{
    console.log("app is listening to port 8080");
})
