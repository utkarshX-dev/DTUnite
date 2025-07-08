const { Router } = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinary.js");
const upload = multer({ storage });
const { addFeedback, addLostFound, deleteLostFound, getAllLostFound } = require("../controllers/utilControllers.js");

const router = Router();

router.post("/feedback", addFeedback);
router.get("/lost-and-found", getAllLostFound); 
router.post("/lost-and-found", upload.single("image"), addLostFound);
router.delete("/lost-and-found/:lostAndFoundItemid", deleteLostFound);

module.exports = router;