const TabRepository = require('../repositories/TabRepository');
const CategoryRepository = require('../repositories/CategoryRepository');
const BookmarkRepository = require('../repositories/BookmarkRepository');
const ApiError = require('../errors/ApiError');


class TabService {
    async getAll(userId) {
        return TabRepository.findByUserId(userId);
    }

    async create(name, userId) {
        if (!name) {
            throw ApiError.badRequest('Tab name is required');
        }
        const existing = await TabRepository.findByNameAndUser(name, userId);
        if (existing) {
            throw ApiError.conflict(`Tab "${name}" already exists`);
        }
        return TabRepository.create({ name, user: userId });
    }

    async delete(id, userId) {
        const tab = await TabRepository.findByIdAndUser(id, userId);
        if (!tab) {
            throw ApiError.notFound(`Tab with ID "${id}" not found`);
        }
        // Delete all categories in this tab and their bookmarks
        await CategoryRepository.deleteByTabAndUser(tab._id, userId);
        await this._deleteBookmarksWithoutCategory(userId);
        return TabRepository.deleteByIdAndUser(id, userId);
    }

    async _deleteBookmarksWithoutCategory(userId) {
        const bookmarks = await BookmarkRepository.findByUserId(userId);
        for (const bookmark of bookmarks) {
            if (!bookmark.category) continue;
            const category = await CategoryRepository.findByIdAndUser(bookmark.category, userId);
            if (!category) {
                await BookmarkRepository.deleteByIdAndUser(bookmark._id, userId);
            }
        }
    }

    async updateName(tabId, userId, newName) {
        if (!newName || newName.trim() === '') {
            throw ApiError.badRequest('New tab name is required');
        }

        const updatedTab = await TabRepository.updateByIdAndUser(
            tabId,
            userId,
            { name: newName.trim() }
        );

        if (!updatedTab) {
            throw ApiError.notFound('Tab not found or you do not have permission to edit it');
        }

        return updatedTab;
    }
}

module.exports = new TabService();
