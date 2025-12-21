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
            const { title, URL, collectionId, tags, note } = req.body;
            const bookmark = await BookmarkService.create(title, URL, collectionId, tags, note, req.user._id);
            res.status(201).json({ message: 'Bookmark created successfully', doc: bookmark });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await BookmarkService.delete(id, req.user._id);
            res.status(202).json({ message: 'Bookmark deleted successfully', doc: deleted });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookmarkController();
