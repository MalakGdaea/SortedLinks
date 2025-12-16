const BookmarkRepository = require('../repositories/BookmarkRepository');
const CategoryRepository = require('../repositories/CategoryRepository');
const ApiError = require('../errors/ApiError');
const { getIdObject } = require('./databaseManager');

class BookmarkService {
    async getAll(userId) {
        return BookmarkRepository.findByUserId(userId);
    }

    async getByCategory(categoryId, userId) {
        return BookmarkRepository.findByCategoryAndUser(categoryId, userId);
    }

    async create(title, url, categoryId, tags, note, userId) {
        if (!url) {
            throw ApiError.badRequest('URL is required');
        }
        const existing = await BookmarkRepository.findByUrlAndUser(url, userId);
        if (existing) {
            throw ApiError.conflict('Bookmark with this URL already exists');
        }
        const parsedTags = Array.isArray(tags) ? tags : (typeof tags === 'string' && tags.length ? tags.split(',') : []);
        const bookmarkData = {
            title,
            URL: url,
            category: categoryId ? getIdObject(categoryId) : null,
            tags: parsedTags,
            note,
            user: userId,
        };
        return BookmarkRepository.create(bookmarkData);
    }

    async delete(bookmarkId, userId) {
        const bookmark = await BookmarkRepository.findByIdAndUser(bookmarkId, userId);
        if (!bookmark) {
            throw ApiError.notFound('Bookmark not found');
        }
        return BookmarkRepository.deleteByIdAndUser(bookmarkId, userId);
    }
}

module.exports = new BookmarkService();
