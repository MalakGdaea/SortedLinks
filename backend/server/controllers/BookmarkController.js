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

    async update(req, res, next) {
        try {
            const userId = req.user._id;
            const { id } = req.params;
            const dataToUpdate = req.body;
            if (!dataToUpdate) {
                throw new Error("No data provided for update");
            }
            const updated = await BookmarkService.update(id, userId, dataToUpdate);
            res.status(200).json({ message: 'Bookmark updated successfully', doc: updated });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookmarkController();
