const { Router } = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinary.js");
const upload = multer({ storage });
const { addFeedback, addLostFound } = require("../controllers/utilControllers.js");

const router = Router();

router.post("/feedback", addFeedback);
router.post("/lost-and-found", addLostFound);
// router.post("/lost-and-found", upload.single("image"), addLostFound);

module.exports = router;