const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  parkingNumber: String,
  vehicleCategory: String,
  vehicleCompanyName: String,
  registrationNumber: String,
  ownerName: String,
  ownerContactNumber: Number,
  inTime: { type: Date, default: Date.now },
  outTime: { type: Date,},
  parkingCharge: String,
  remark: String,
  status: String
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
