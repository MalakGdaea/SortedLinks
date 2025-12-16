const CategoryService = require('../services/CategoryService');
const { getIdObject } = require('../services/databaseManager');

class CategoryController {
    async getByTab(req, res, next) {
        try {
            const { tabID } = req.params;
            const categories = await CategoryService.getByTab(tabID, req.user._id);
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { tabID, categoryName } = req.params;
            const category = await CategoryService.create(tabID, categoryName, req.user._id);
            res.status(201).json({ message: `Category "${categoryName}" created successfully`, category });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { categoryID } = req.params;
            const deleted = await CategoryService.delete(categoryID, req.user._id);
            res.status(202).json({ message: `Category "${deleted.name}" deleted successfully` });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CategoryController();
