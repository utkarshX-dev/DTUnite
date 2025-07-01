const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const wrapAsync = require("../utils/wrapAsync");

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
  const user = await User.findOne({ token }).populate("posts");
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

module.exports = { login, register, sendUserInfo };