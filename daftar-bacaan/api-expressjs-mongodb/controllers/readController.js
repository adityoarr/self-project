const Items = require('../models/read');

exports.createReadList = async (req, res) => {
    try {
        const readList = await Items.insertMany(req.body);
        res.status(201).json(readList);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReadList = async (req, res) => {
    try {
        const readList = await Items.find();
        res.status(200).json(readList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReadListById = async (req, res) => {
    try {
        const readList = await Items.findById(req.params.id);
        if (!readList) {
            return res.status(404).json({ error: 'Read List not found' });
        }
        res.status(200).json(readList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReadList = async (req, res) => {
    try {
        const readList = await Items.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!readList) {
            return res.status(404).json({ error: 'Read List not found' });
        }
        res.status(200).json(readList);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteReadList = async (req, res) => {
    try {
        const readList = await Items.findByIdAndDelete(req.params.id);
        if (!readList) {
            return res.status(404).json({ error: 'Read List not found' });
        }
        res.status(200).json({ message: 'Read List deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};