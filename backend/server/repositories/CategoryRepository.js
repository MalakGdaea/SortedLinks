const Category = require('../models/Category');

class CategoryRepository {
    findByUserId(userId) {
        return Category.find({ user: userId });
    }

    findByIdAndUser(id, userId) {
        return Category.findOne({ _id: id, user: userId });
    }

    findByNameTabAndUser(name, tabId, userId) {
        return Category.findOne({ name, tab: tabId, user: userId });
    }

    create(categoryData) {
        const category = new Category(categoryData);
        return category.save();
    }

    updateByIdAndUser(id, userId, updateData) {
        return Category.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true }
        );
    }

    deleteByIdAndUser(id, userId) {
        return Category.findOneAndDelete({ _id: id, user: userId });
    }

    deleteByTabAndUser(tabId, userId) {
        return Category.deleteMany({ tab: tabId, user: userId });
    }
}

module.exports = new CategoryRepository();
