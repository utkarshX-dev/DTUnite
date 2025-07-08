const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/userModel.js');
const Feedback = require('../schemas/feedbackSchema.js');
const LostAndFound = require('../schemas/lostAndFoundSchema.js');
const { post } = require('../schemas/userSchema.js');

const addFeedback = wrapAsync(async (req, res) => {
    const { name, email, feedback } = req.body;
    if (!name || !email || !feedback) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Thank you for your feedback!" });
});
const getAllLostFound = wrapAsync(async (req, res) => {
    const lostAndFoundItems = await LostAndFound.find().populate('postedBy', 'username');
    res.status(200).json(lostAndFoundItems);
});
const addLostFound = wrapAsync(async (req, res) => {
    const { title, description, location, contact} = req.body;
    const token = req.headers.authorization;
    if (!title || !description || !location || !contact || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User. Login to Continue." });
    }
    const postedBy = await User.findOne({ token });
    if (!postedBy) {
        return res.status(404).json({ message: "User not found" });
    }
    const newLostAndFound = new LostAndFound({
        title,
        description,
        image: req.file.path,
        location,
        contact,
        postedBy,
    });
    await newLostAndFound.save();
    await postedBy.lostAndFound.push(newLostAndFound._id);
    await postedBy.save();
    res.status(201).json({ message: "Lost and Found item added successfully" });
});

const deleteLostFound = wrapAsync(async (req, res) => {
    const { lostAndFoundItemid } = req.params;
    const token = req.headers.authorization;
    const lostAndFoundItem = await LostAndFound.findById(lostAndFoundItemid);
    if (!lostAndFoundItem) {
        return res.status(404).json({ message: "Lost and Found item not found" });
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User. Login to Continue." });
    }
    const postedBy = await User.findOne({ token });
    if (!postedBy) {
        return res.status(404).json({ message: "User not found" });
    }
    postedBy.lostAndFound.pull(lostAndFoundItem._id);
    await postedBy.save();
    await LostAndFound.deleteOne({ _id: lostAndFoundItemid });
    res.status(200).json({ message: "Lost and Found item updated successfully" });
});
module.exports = { addFeedback, addLostFound, deleteLostFound, getAllLostFound };