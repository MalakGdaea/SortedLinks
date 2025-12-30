const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const UserRepository = require('../repositories/UserRepository');
const TabRepository = require('../repositories/TabRepository');
const ApiError = require('../errors/ApiError');
const TokenService = require("./TokenService");

class AuthService {

    async register(email, password, name) {
        const existing = await UserRepository.findByEmail(email);
        if (existing) {
            throw ApiError.conflict('User already exists');
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await UserRepository.create({ email, passwordHash: hash, name });

        // Create default tab for the new user
        await TabRepository.create({
            name: 'Default',
            user: user._id
        });

        return { _id: user._id, email: user.email, name: user.name };
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw ApiError.unauthorized('Invalid credentials');
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            throw ApiError.unauthorized('Invalid credentials');
        }

        const accessToken = TokenService.generateAccessToken(user);
        const refreshToken = TokenService.generateRefreshToken(user);
        return { accessToken, refreshToken, user: { _id: user._id, email: user.email, name: user.name } };
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error("No refresh token");
        }

        const payload = TokenService.verifyRefreshToken(refreshToken);
        const accessToken = TokenService.generateAccessToken({ _id: payload.userId, email: payload.email });

        return {
            user: {
                _id: payload.userId,
                email: payload.email,
                name: payload.name,
            },
            accessToken,
        };
    }
}

module.exports = new AuthService();
