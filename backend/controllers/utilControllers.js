const wrapAsync = require('../utils/wrapAsync.js');
const Feedback = require('../schemas/feedbackSchema.js');
const LostAndFound = require('../schemas/lostAndFoundSchema.js');

const addFeedback = wrapAsync(async (req, res) => {
    const { name, email, feedback } = req.body;
    if (!name || !email || !feedback) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Thank you for your feedback!" });
});

// const addLostFound = wrapAsync(async (req, res) => {
//     const { title, description, location, contact } = req.body;
//     if (!title || !description || !location || !contact || !req.file) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
//     const newLostAndFound = new LostAndFound({
//         title,
//         description,
//         image: req.file.path,
//         location,
//         contact,
//     });
//     await newLostAndFound.save();
//     res.status(201).json({ message: "Lost and Found item added successfully" });
// });

const addLostFound = wrapAsync(async (req, res) => {
    const { title, description, location, contact, image } = req.body;
    if (!title || !description || !location || !contact || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newLostAndFound = new LostAndFound({
        title,
        description,
        image,
        location,
        contact,
    });
    await newLostAndFound.save();
    res.status(201).json({ message: "Lost and Found item added successfully" });
});

module.exports = { addFeedback, addLostFound };