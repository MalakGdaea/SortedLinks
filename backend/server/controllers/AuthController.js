const AuthService = require('../services/AuthService');

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const user = await AuthService.register(email, password, name);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const result = await AuthService.login(email, password);
            res.status(200).json({ message: 'Logged in successfully', ...result });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
