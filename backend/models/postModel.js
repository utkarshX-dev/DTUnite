const mongoose = require('mongoose')
const postSchema = require('../schemas/postSchema.js');
module.exports= mongoose.model('Post', postSchema);
