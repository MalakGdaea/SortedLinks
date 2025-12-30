const jwt = require('jsonwebtoken');

class TokenService {
    static generateAccessToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
    }

    static generateRefreshToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );
    }

    static verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch {
            throw new Error("Invalid refresh token");
        }
    }
}

module.exports = TokenService;
