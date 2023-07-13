const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminName: String,
  userName: { type: String, unique: true, required: true },
  mobileNumber: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  ResetToken: { type: String },
  ExpirationToken: { type: Date },
  password: String,
  adminRegDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);
