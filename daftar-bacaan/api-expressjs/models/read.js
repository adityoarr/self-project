const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Items', itemsSchema);