const RegisteredUser = require('../models/reguserModel');

const registeredUserController = {
  getAllRegisteredUsers: (req, res) => {
    RegisteredUser.find()
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  },

  register: async (req, res) => {
    try {
      const { ID, FirstName, LastName, MobileNumber, Email, Password } = req.body;

      const existingUser = await RegisteredUser.findOne({ Email });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const newUser = new RegisteredUser({
        ID,
        FirstName,
        LastName,
        MobileNumber,
        Email,
        Password
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { Email,MobileNumber, Password } = req.body;

      const user = await RegisteredUser.findOne({ Email,MobileNumber });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.Password !== Password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Perform additional authentication steps if needed

      // Return success response
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    // Perform logout functionality if required

    // Return success response
    res.status(200).json({ message: 'Logout successful' });
  }
};

module.exports = registeredUserController;
