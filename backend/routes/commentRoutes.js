const {Router} = require('express');
const router = Router();
const {addComment, deleteComment, getPostComments} = require('../controllers/commentController');

router.post("/", addComment);
router.delete("/:commentId/delete", deleteComment);
router.get("/:postId", getPostComments);

module.exports = router;