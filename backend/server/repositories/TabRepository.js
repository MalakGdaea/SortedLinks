const Tab = require('../models/Tab');

class TabRepository {
    findByUserId(userId) {
        return Tab.find({ user: userId });
    }

    findByNameAndUser(name, userId) {
        return Tab.findOne({ name, user: userId });
    }

    findByIdAndUser(id, userId) {
        return Tab.findOne({ _id: id, user: userId });
    }

    create(tabData) {
        const tab = new Tab(tabData);
        return tab.save();
    }

    updateByIdAndUser(id, userId, updateData) {
        return Tab.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true }
        );
    }

    deleteByNameAndUser(name, userId) {
        return Tab.findOneAndDelete({ name, user: userId });
    }

    deleteByIdAndUser(id, userId) {
        return Tab.findOneAndDelete({ _id: id, user: userId });
    }
}

module.exports = new TabRepository();
