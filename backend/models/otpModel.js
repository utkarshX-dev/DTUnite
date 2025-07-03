const mongoose = require('mongoose')
const OtpSchema = require('../schemas/otpSchema.js');
module.exports = mongoose.model('Otp', OtpSchema);

