const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const base64EncodeMiddleware = require('../middlewares/base64encoder');

// Admin routes

// Create a new admin (accessible to any authenticated user)
router.post('/create',adminController.createAdmin);
// Admin login (accessible to any authenticated user)
router.post('/login',adminController.adminLogin);
router.get('/detail/:id',adminController.adminLogin);


module.exports = router;
