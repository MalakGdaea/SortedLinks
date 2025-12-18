const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res, next) => CategoryController.getAllCategories(req, res, next));
router.post('/:tabID/:categoryName', auth, (req, res, next) => CategoryController.create(req, res, next));
router.delete('/:categoryID', auth, (req, res, next) => CategoryController.delete(req, res, next));

module.exports = router;
