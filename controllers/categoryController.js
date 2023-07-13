const Category = require('../models/categoryModel');
const { authenticateToken, authorizeToken } = require('../middlewares/auth');

module.exports = {
  getAllCategories:[
    async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }],

  createCategory: [
    // authenticateToken,
    // authorizeToken(['admin']),
    async (req, res) => {
      try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(200).json(savedCategory);
      } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
      }
    }
  ],

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateCategory: [
    // authenticateToken,
    // authorizeToken(['admin']),
    async (req, res) => {
      try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
      } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
      }
    }
  ],

  deleteCategory: [
    // authenticateToken,
    // authorizeToken(['admin']),
    async (req, res) => {
      try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  ]
};
