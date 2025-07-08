const { Schema, model } = require('mongoose');
const LostAndFoundSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = model('LostAndFound', LostAndFoundSchema);