const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/BookmarkController');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res, next) => BookmarkController.getAll(req, res, next));
router.post('/', auth, (req, res, next) => BookmarkController.create(req, res, next));
router.delete('/:id', auth, (req, res, next) => BookmarkController.delete(req, res, next));
router.put("/:id", auth, (req, res, next) => BookmarkController.update(req, res, next));
module.exports = router;
