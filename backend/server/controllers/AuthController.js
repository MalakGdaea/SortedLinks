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
            const { user, accessToken, refreshToken } =
                await AuthService.login(email, password);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                message: "Logged in successfully",
                user,
                accessToken,
            });
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: "No refresh token" });
            }
            const result = await AuthService.refresh(refreshToken);

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
