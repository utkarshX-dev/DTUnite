const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const Comment = require("../models/commentModel.js");
const wrapAsync = require("../utils/wrapAsync.js");

const getPosts = wrapAsync(async (req, res) => {
  const allPosts = await Post
    .find({})
    .populate("author", "username")
    .populate("likedBy", "username");
  return res.status(200).json({ message: "data fetched", posts: allPosts });
});
const addPost = wrapAsync(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Give a post description" });
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const image = req.file.path; 

  const newPost = new Post({
    description,
    image: image || null,
    author: user._id,
  });

  await newPost.save();
  user.posts.push(newPost._id);
  await user.save();

  return res.status(201).json({
    message: "Post added successfully",
    post: newPost,
  });
});

const incrementLike = wrapAsync(async (req, res) => {
  const { postID } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const post = await Post.findById(postID);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userIdStr = user._id.toString();

  if (post.likedBy.includes(user._id)) {
    return res.json({ message: "Already liked" });
  }


  post.dislikedBy = post.dislikedBy.filter(id => id.toString() !== userIdStr);
 
  post.likedBy.push(user._id);

 
  user.likedPosts.push(postID);
  user.dislikedPosts = user.dislikedPosts.filter(id => id.toString() !== postID);

  await user.save();
  await post.save();

  return res.status(200).json({
    message: "Post liked",
    likes: post.likedBy.length,
    dislikes: post.dislikedBy.length
  });
});

const decrementLike = wrapAsync(async (req, res) => {
  const { postID } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const post = await Post.findById(postID);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userIdStr = user._id.toString();

  if (post.dislikedBy.includes(user._id)) {
    return res.json({ message: "Already disliked" });
  }


  post.likedBy = post.likedBy.filter(id => id.toString() !== userIdStr);
  
  post.dislikedBy.push(user._id);

 
  user.likedPosts = user.likedPosts.filter(id => id.toString() !== postID);
  user.dislikedPosts.push(postID);

  await user.save();
  await post.save();

  return res.status(200).json({
    message: "Post disliked",
    likes: post.likedBy.length,
    dislikes: post.dislikedBy.length
  });
});

const deletePost = wrapAsync(async (req, res) => {
  const { postID } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "Invalid or missing token" });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const post = await Post.findById(postID);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (!post.author.equals(user._id)) {
    return res.status(403).json({ message: "Not authorized to delete this post" });
  }

  for (const commentId of post.comments) {
    await Comment.findByIdAndDelete(commentId);
  }
  await Post.findByIdAndDelete(postID);
  user.posts = user.posts.filter(id => id.toString() !== postID);
  await user.save();
  return res.status(200).json({ message: "Post deleted successfully" });
});

module.exports = {getPosts, addPost, incrementLike, decrementLike, deletePost };