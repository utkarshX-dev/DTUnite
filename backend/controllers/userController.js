const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const wrapAsync = require("../utils/wrapAsync");
const Otp = require("../models/otpModel.js");
const nodemailer = require("nodemailer");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const register = wrapAsync(async (req, res) => {
  let { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "Provide all credentials" });
  }
  const existingUserName = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });
  if (existingUserName) {
    return res.status(400).json({ message: "Username already exists" });
  }
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  await newUser.save();
  return res.status(200).json({ message: "User registered successfully" });
});

const sendUserInfo = wrapAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ token }).populate({
    path: "posts",
    populate: [
      { path: "likedBy", select: "username" },
      { path: "dislikedBy", select: "username" },
      {
        path: "comments",
        populate: { path: "author", select: "username" }, 
      },
    ],
  });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ user });
});


const login = wrapAsync(async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Provide all credentials" });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "Email does not exist" });
  }
  let isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is incorrect" });
  }
  const token = await crypto.randomBytes(32).toString("hex");
  existingUser.token = token;
  await existingUser.save();
  return res.status(200).json({ message: "Logged in successfully", token });
});
const sendOtp = wrapAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ email, otp, expiresAt: Date.now() + 10 * 60 * 1000 });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.otp_APP_PASSWORD,     
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Welcome to DTU Unite",
    text: `Your OTP is: ${otp}`,
  });

  res.json({ message: "OTP sent to email." });
});
const verifyOtp = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email, otp });
  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }
  await Otp.deleteMany({ email }); 
  res.json({ message: "OTP verified." });
});
const changeAvatar = wrapAsync(async (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return res.status(400).json({ message: "Avatar is required" });
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  user.avatar = avatar;
  await user.save();
  return res.status(200).json({ message: "Avatar updated successfully" });
});

const deleteUser = wrapAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await User.deleteOne({ _id: user._id });
  await Post.deleteMany({ author: user._id });
  await Comment.deleteMany({ author: user._id });
  return res.status(200).json({ message: "Account deleted successfully!" });
});
module.exports = { login, register, sendUserInfo, sendOtp, verifyOtp, changeAvatar, deleteUser };