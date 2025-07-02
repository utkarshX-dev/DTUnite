const {Schema, model} = require('mongoose');
const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    feedback: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = model('Feedback', feedbackSchema);