const {Schema} = require('mongoose');
const commentSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = commentSchema;