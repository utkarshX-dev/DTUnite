const {Schema} = require('mongoose');
const postSchema = new Schema({
    description: {
        required : true,
        type: String,
    },
    image:{
        type: String,
        default: null,
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    dislikedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports = postSchema;