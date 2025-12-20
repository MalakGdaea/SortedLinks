const Bookmark = require('../models/Bookmark');

class BookmarkRepository {
    findByUserId(userId) {
        return Bookmark.find({ user: userId });
    }

    findByCategoryAndUser(categoryId, userId) {
        return Bookmark.find({ category: categoryId, user: userId });
    }

    findByIdAndUser(id, userId) {
        return Bookmark.findOne({ _id: id, user: userId });
    }

    findByUrlAndUser(url, userId) {
        return Bookmark.findOne({ URL: url, user: userId });
    }

    create(bookmarkData) {
        const bookmark = new Bookmark(bookmarkData);
        return bookmark.save();
    }

    updateByIdAndUser(id, userId, updateData) {
        return Bookmark.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true }
        );
    }

    deleteByIdAndUser(id, userId) {
        return Bookmark.findOneAndDelete({ _id: id, user: userId });
    }

    deleteByCategoryAndUser(categoryId, userId) {
        return Bookmark.deleteMany({
            category: categoryId,
            user: userId
        });
    }
}

module.exports = new BookmarkRepository();
