const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});
module.exports = OtpSchema;