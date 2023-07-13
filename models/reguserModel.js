const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
    ID: { type: Number, required: false },
    FirstName: { type: String, default: null },
    LastName: { type: String, default: null },
    MobileNumber: { type: Number, default: null },
    Email: {type: String,required: true},
    Password: { type: String, default: null },
    RegDate: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('reguser', registeredUserSchema);