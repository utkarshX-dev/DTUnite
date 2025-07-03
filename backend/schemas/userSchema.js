    const { Schema } = require('mongoose');
    const userSchema = new Schema({
        username: {
            type: String,
            required : true,
            unique: true,
        },
        password: {
            type: "String",
            required: true,
        },
        email: {
            type: "String",
            required: true,
            unique: true,
        },
        posts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        token: {
            type: String,
        },
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        dislikedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        avatar:{
            type: String,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    })
    module.exports = userSchema;