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
        await BookmarkRepository.deleteByCategoryAndUser(categoryId, userId);
        return CategoryRepository.deleteByIdAndUser(categoryId, userId);
    }

    async updateName(categoryId, userId, newName) {
        if (!newName || newName.trim() === '') {
            throw ApiError.badRequest('New collection name is required');
        }

        const updatedCategory = await CategoryRepository.updateByIdAndUser(
            categoryId,
            userId,
            { name: newName.trim() }
        );

        if (!updatedCategory) {
            throw ApiError.notFound('Category not found or you do not have permission to edit it');
        }

        return updatedCategory;
    }
}

module.exports = new CategoryService();
