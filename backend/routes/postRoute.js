const {Router} = require('express');
const router = Router();
const {addPost, incrementLike, decrementLike, deletePost, getPosts} = require('../controllers/postController');
router.get("/", getPosts);
router.post("/", addPost);
router.patch(`/:postID/like`, incrementLike);
router.patch(`/:postID/dislike`, decrementLike);
router.delete(`/:postID/delete`, deletePost);
module.exports = router; 