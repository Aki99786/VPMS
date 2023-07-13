const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/secretKey');
require('dotenv').config();

module.exports = {
  createAdmin: async (req, res) => {
    try {
      const { adminName, userName, mobileNumber, email, password } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });

      if (existingAdmin) {
        return res.status(409).json({ message: 'Admin already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const admin = new Admin({
        adminName,
        userName,
        mobileNumber,
        email,
        password: hashedPassword,
      });

      // Save the admin to the database
      await admin.save();

      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { userName, password } = req.body;

      // Find the admin by username
      const admin = await Admin.findOne({ userName });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate JWT token
      const payload = {
        adminId: admin._id,
      };

      const token = jwt.sign(payload, SECRET_KEY);
      const data = {toke: token, status: '200',admin}
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Implement other admin-related operations (update, delete, etc.) as needed
};
