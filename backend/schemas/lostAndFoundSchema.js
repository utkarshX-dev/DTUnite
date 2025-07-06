const { Schema, model } = require('mongoose');
const LostAndFoundSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => Date.now() + 10 * 24 * 60 * 60 * 1000 },
    lostAndFound: { type: Boolean, default: false }, // false for lost, true for found
});
module.exports = model('LostAndFound', LostAndFoundSchema);