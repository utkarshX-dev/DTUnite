const {model} = require('mongoose');
const commentSchema = require('../schemas/commentSchema');
module.exports = model('Comment', commentSchema);