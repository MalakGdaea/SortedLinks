const User = require('../models/User');

class UserRepository {
    findById(id) {
        return User.findById(id).select('-passwordHash');
    }

    findByEmail(email) {
        return User.findOne({ email });
    }

    create(userData) {
        const user = new User(userData);
        return user.save();
    }
}

module.exports = new UserRepository();
