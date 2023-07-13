const express = require('express');
const router = express.Router();
const registeredUserController = require('../controllers/reguserController');

// User routes
router.post('/register', registeredUserController.register);
router.post('/login', registeredUserController.login);

module.exports = router;
