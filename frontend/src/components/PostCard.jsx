import { useState, useEffect } from "react";
import {
  Card, CardHeader, CardContent, CardMedia, Avatar, Typography, IconButton, Box, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemAvatar, ListItemText,
  Button, Collapse, Menu, MenuItem, Snackbar, Alert, TextField, CircularProgress, Tooltip
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import "../styles/user.css";

export default function PostCard({
  postId, postAuthor, postDate, postImage, postDescription,
  postComments, postLikedUsers, postDislikedUsers,
  onPostDelete, currentUser, refreshPosts, userAvatar
}) {
  if (!currentUser) return null;

  const [likesOpen, setLikesOpen] = useState(false);
  const [dislikesOpen, setDislikesOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState(postComments || []);
  const [commentText, setCommentText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("token");

  
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(Array.isArray(postLikedUsers) ? postLikedUsers.length : 0);
  const [dislikesCount, setDislikesCount] = useState(Array.isArray(postDislikedUsers) ? postDislikedUsers.length : 0);

  useEffect(() => {
    setLiked(
      Array.isArray(postLikedUsers) && currentUser
        ? postLikedUsers.some(u => u._id === currentUser._id)
        : false
    );
    setDisliked(
      Array.isArray(postDislikedUsers) && currentUser
        ? postDislikedUsers.some(u => u._id === currentUser._id)
        : false
    );
    setLikesCount(Array.isArray(postLikedUsers) ? postLikedUsers.length : 0);
    setDislikesCount(Array.isArray(postDislikedUsers) ? postDislikedUsers.length : 0);
  }, [postLikedUsers, postDislikedUsers, currentUser]);

  const handleMenuOpen = e => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDeleteClick = () => { setDeleteDialogOpen(true); handleMenuClose(); };
  const handleDeleteCancel = () => setDeleteDialogOpen(false);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}/delete`, { headers: { Authorization: token } });
      setDeleteDialogOpen(false);
      setSnackbar({ open: true, message: "Post deleted", severity: "success" });
      if (onPostDelete) onPostDelete(postId);
      if (refreshPosts) refreshPosts();
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to delete post.", severity: "error" });
      setDeleteDialogOpen(false);
    }
  };

  const handleLike = async () => {
  if (likeLoading || liked) return;
  setLikeLoading(true);
  try {
    const res = await axios.patch(
      `http://localhost:8080/api/posts/${postId}/like`,
      {},
      { headers: { Authorization: token } }
    );
    setLikesCount(res.data.likes);
    setDislikesCount(res.data.dislikes);
    setLiked(true);
    setDisliked(false);
    setSnackbar({ open: true, message: "Liked the post!", severity: "success" });
    if (typeof refreshPosts === "function") refreshPosts(); // <-- add this
  } catch (err) {
    setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to like post.", severity: "error" });
  } finally {
    setLikeLoading(false);
  }
};

const handleDislike = async () => {
  if (dislikeLoading || disliked) return;
  setDislikeLoading(true);
  try {
    const res = await axios.patch(
      `http://localhost:8080/api/posts/${postId}/dislike`,
      {},
      { headers: { Authorization: token } }
    );
    setLikesCount(res.data.likes);
    setDislikesCount(res.data.dislikes);
    setDisliked(true);
    setLiked(false);
    setSnackbar({ open: true, message: "Disliked the post!", severity: "success" });
    if (typeof refreshPosts === "function") refreshPosts(); // <-- add this
  } catch (err) {
    setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to dislike post.", severity: "error" });
  } finally {
    setDislikeLoading(false);
  }
};

  const handleAddComment = async e => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/comments/",
        { postId, text: commentText },
        { headers: { Authorization: token } }
      );
      // Ensure comment.text is present
      const newComment = {
        ...res.data.comment,
        text: res.data.comment.text || commentText,
        author: { username: currentUser.username, _id: currentUser._id }
      };
      setComments(prev => [...prev, newComment]);
      setCommentText("");
      setSnackbar({ open: true, message: "Comment added", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to add comment.", severity: "error" });
    }
    setCommentLoading(false);
  };

  const handleDeleteComment = async commentId => {
    try {
      await axios.delete(`http://localhost:8080/api/comments/${commentId}/delete`, { headers: { Authorization: token } });
      setComments(prev => prev.filter(c => c._id !== commentId));
      setSnackbar({ open: true, message: "Comment deleted", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to delete comment.", severity: "error" });
    }
  };

  return (
    <>
      <Card className="postcard-root mb-5 mt-5">
        <CardHeader
          avatar={
            userAvatar ? (
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                <img src={userAvatar} alt="User Avatar" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
              </Avatar>
            ) : (
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {currentUser.username?.[0]?.toUpperCase() || "U"}
              </Avatar>
            )
          }
          action={
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleDeleteClick} sx={{ color: "#d32f2f" }}>
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete Post
                </MenuItem>
              </Menu>
            </>
          }
          title={
            <Typography variant="subtitle1" fontWeight={700}>
              {postAuthor}
            </Typography>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              {new Date(postDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </Typography>
          }
          sx={{ pb: 0 }}
        />
        {postImage && (
          <Box className="postcard-image-wrapper">
            <CardMedia
              component="img"
              image={postImage}
              alt="Post"
              className="postcard-image"
            />
          </Box>
        )}
        <CardContent sx={{ pb: 1 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {postDescription}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box className="postcard-actions">
            <Tooltip title={liked ? "Liked" : "Like"}>
              <span>
                <IconButton
                  size="small"
                  onClick={handleLike}
                  disabled={likeLoading || liked}
                  className={liked ? "liked" : ""}
                >
                  {liked ? (
                    <ThumbUpAltIcon color="primary" />
                  ) : (
                    <ThumbUpAltOutlinedIcon color="primary" />
                  )}
                </IconButton>
              </span>
            </Tooltip>
            <Typography variant="body2" fontWeight={500}>
              {likesCount} Likes
            </Typography>
            <Tooltip title={disliked ? "Disliked" : "Dislike"}>
              <span>
                <IconButton
                  size="small"
                  onClick={handleDislike}
                  disabled={dislikeLoading || disliked}
                  className={disliked ? "disliked" : ""}
                >
                  {disliked ? (
                    <ThumbDownAltIcon color="error" />
                  ) : (
                    <ThumbDownAltOutlinedIcon color="error" />
                  )}
                </IconButton>
              </span>
            </Tooltip>
            <Typography variant="body2" fontWeight={500}>
              {dislikesCount} Dislikes
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setLikesOpen(true)}
              className="see-who-btn"
            >
              See Who Likes
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setDislikesOpen(true)}
              className="see-who-btn"
            >
              See Who Dislikes
            </Button>
            <Tooltip title="Show/Hide Comments">
              <IconButton
                size="small"
                onClick={() => setCommentsOpen((v) => !v)}
                className="comment-toggle"
              >
                <ChatBubbleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" fontWeight={500}>
              {comments.length}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Collapse in={commentsOpen}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Comments
            </Typography>
            {comments.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No comments
              </Typography>
            )}
            <List>
              {comments.map((comment) => (
                <ListItem
                  key={comment._id}
                  alignItems="flex-start"
                  secondaryAction={
                    comment.author &&
                    currentUser &&
                    comment.author._id === currentUser._id && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment._id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        width: 28,
                        height: 28,
                        fontSize: 14
                      }}
                    >
                      <ChatBubbleOutlineIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span style={{ fontWeight: 600 }}>
                        {comment.author?.username || "User"}
                      </span>
                    }
                    secondary={comment.text || ""}
                  />
                </ListItem>
              ))}
            </List>
            <Box
              component="form"
              onSubmit={handleAddComment}
              className="comment-form"
            >
              <TextField
                size="small"
                variant="outlined"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                fullWidth
                disabled={commentLoading}
                className="comment-input"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={commentLoading || !commentText.trim()}
                className="comment-btn"
              >
                {commentLoading ? <CircularProgress size={20} /> : "Post"}
              </Button>
            </Box>
          </Collapse>
        </CardContent>
        <Dialog
          open={likesOpen}
          onClose={() => setLikesOpen(false)}
          PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
        >
          <DialogTitle>Liked by</DialogTitle>
          <DialogContent>
            {postLikedUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No likes yet
              </Typography>
            ) : (
              <List>
                {postLikedUsers.map((user, idx) => (
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: deepOrange[500], width: 28, height: 28 }}>
                        {user.username?.[0]?.toUpperCase() || "U"}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={dislikesOpen}
          onClose={() => setDislikesOpen(false)}
          PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
        >
          <DialogTitle>Disliked by</DialogTitle>
          <DialogContent>
            {postDislikedUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No dislikes yet
              </Typography>
            ) : (
              <List>
                {postDislikedUsers.map((user, idx) => (
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#d32f2f", width: 28, height: 28 }}>
                        {user.username?.[0]?.toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this post? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}