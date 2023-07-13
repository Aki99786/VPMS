const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authentication= require('../middlewares/auth');



// Category routes
router.get('/', categoryController.getAllCategories);
router.get('/search/:id', categoryController.getCategoryById);
router.post('/create',categoryController.createCategory);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;
