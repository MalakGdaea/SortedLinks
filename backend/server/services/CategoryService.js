const CategoryRepository = require('../repositories/CategoryRepository');
const BookmarkRepository = require('../repositories/BookmarkRepository');
const ApiError = require('../errors/ApiError');
const { getIdObject } = require('./databaseManager');

class CategoryService {
    async getAllCategories(userId) {
        return CategoryRepository.findByUserId(userId);
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
