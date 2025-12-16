const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const UserRepository = require('../repositories/UserRepository');
const TabRepository = require('../repositories/TabRepository');
const ApiError = require('../errors/ApiError');

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

        return { id: user._id, email: user.email, name: user.name };
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
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: user._id, email: user.email, name: user.name } };
    }
}

module.exports = new AuthService();
