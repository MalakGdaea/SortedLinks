const CategoryService = require('../services/CategoryService');

class CategoryController {
    async getAllCategories(req, res, next) {
        try {
            const categories = await CategoryService.getAllCategories(req.user._id);
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { tabID, categoryName } = req.params;
            const category = await CategoryService.create(tabID, categoryName, req.user._id);
            res.status(201).json({ message: `Category "${categoryName}" created successfully`, doc: category });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await CategoryService.delete(id, req.user._id);
            res.status(202).json({ message: `Category "${deleted.name}" deleted successfully`, doc: deleted });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const userId = req.user._id;

            const category = await CategoryService.updateName(id, userId, name);
            res.status(200).json({
                message: 'Collection renamed successfully',
                doc: category
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CategoryController();
