const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const wrapAsync = require('../utils/wrapAsync');

const getPostComments = wrapAsync(async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }
    const comments = await Comment.find({ post: postId }).populate("author", "username");
    return res.status(200).json({ comments });
});

const addComment = wrapAsync(async (req, res) => {
    const { postId, text } = req.body;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ token });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const newComment = new Comment({
        post: postId,
        author: user._id,
        text
    });
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    post.comments.push(newComment._id);
    user.comments.push(newComment._id);
    await post.save();
    await user.save();
    await newComment.save();
    return res.status(201).json({ message: "Comment added", comment: newComment });
});
const deleteComment = wrapAsync(async (req, res) => {
    const { commentId } = req.params;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ token });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.author.equals(user._id)) {
        return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);
    const post = await Post.findById(comment.post);
    post.comments = post.comments.filter(id => id.toString() !== commentId);
    await post.save();
    
    user.comments = user.comments.filter(id => id.toString() !== commentId);
    await user.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
});

module.exports = { addComment, deleteComment, getPostComments };