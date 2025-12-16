const BookmarkService = require('../services/BookmarkService');

class BookmarkController {
    async getAll(req, res, next) {
        try {
            const bookmarks = await BookmarkService.getAll(req.user._id);
            res.status(200).json(bookmarks);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { title, URL, category, tags, note } = req.body;
            const bookmark = await BookmarkService.create(title, URL, category, tags, note, req.user._id);
            res.status(201).json({ message: 'Bookmark created successfully', bookmark });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await BookmarkService.delete(id, req.user._id);
            res.status(202).json({ message: 'Bookmark deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookmarkController();
