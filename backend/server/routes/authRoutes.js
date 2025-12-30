const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', (req, res, next) => AuthController.register(req, res, next));
router.post('/login', (req, res, next) => AuthController.login(req, res, next));
router.post('/refresh', (req, res, next) => AuthController.refresh(req, res, next));
module.exports = router;
