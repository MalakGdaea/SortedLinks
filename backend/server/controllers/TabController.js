const TabService = require('../services/TabService');

class TabController {
    async getAll(req, res, next) {
        try {
            const tabs = await TabService.getAll(req.user._id);
            res.status(200).json(tabs);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { name } = req.params;
            const tab = await TabService.create(name, req.user._id);
            res.status(201).json({ message: `Tab "${name}" created successfully`, doc: tab });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedTab = await TabService.delete(id, req.user._id);
            res.status(202).json({ message: `Tab deleted successfully`, doc: deletedTab });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const userId = req.user._id;

            const tab = await TabService.updateName(id, userId, name);
            res.status(200).json({
                message: 'Tab renamed successfully',
                doc: tab
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TabController();
