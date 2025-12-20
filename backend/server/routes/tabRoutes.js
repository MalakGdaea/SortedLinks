const express = require('express');
const router = express.Router();
const TabController = require('../controllers/TabController');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res, next) => TabController.getAll(req, res, next));
router.post('/:name', auth, (req, res, next) => TabController.create(req, res, next));
router.delete('/:id', auth, (req, res, next) => TabController.delete(req, res, next));

module.exports = router;
