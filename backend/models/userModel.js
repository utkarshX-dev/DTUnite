const mongoose = require('mongoose')
const userSchema = require('../schemas/userSchema.js');
module.exports= mongoose.model('User', userSchema);
