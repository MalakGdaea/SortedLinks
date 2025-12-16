const CategoryRepository = require('../repositories/CategoryRepository');
const BookmarkRepository = require('../repositories/BookmarkRepository');
const ApiError = require('../errors/ApiError');
const { getIdObject } = require('./databaseManager');

class CategoryService {
    async getByTab(tabId, userId) {
        const categories = await CategoryRepository.findByTabAndUser(tabId, userId);
        const result = await Promise.all(
            categories.map(async (category) => {
                const bookmarks = await BookmarkRepository.findByCategoryAndUser(category._id, userId);
                return {
                    categoryInfo: category,
                    bookmarks: bookmarks,
                };
            })
        );
        return result;
    }

    async create(tabId, name, userId) {
        if (!name) {
            throw ApiError.badRequest('Category name is required');
        }
        const existing = await CategoryRepository.findByNameTabAndUser(name, tabId, userId);
        if (existing) {
            throw ApiError.conflict(`Category "${name}" already exists in this tab`);
        }
        return CategoryRepository.create({
            name,
            tab: getIdObject(tabId),
            user: userId,
        });
    }

    async delete(categoryId, userId) {
        const category = await CategoryRepository.findByIdAndUser(categoryId, userId);
        if (!category) {
            throw ApiError.notFound('Category not found');
        }
        return CategoryRepository.deleteByIdAndUser(categoryId, userId);
    }
}

module.exports = new CategoryService();
