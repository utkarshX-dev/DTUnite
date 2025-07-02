const Feedback = require('../schemas/feedbackSchema.js');
const {Router} = require('express');
const router = Router();
const wrapAsync = require('../utils/wrapAsync.js');

router.post('/feedback', wrapAsync(async (req, res) => {
    const { name, email, feedback } = req.body;
    if (!name || !email || !feedback) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Thank you for your feedback!" });
}));
module.exports = router;