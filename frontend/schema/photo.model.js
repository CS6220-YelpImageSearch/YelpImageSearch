const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let photoSchema = new Schema({
    caption: {
        type: String
    },
    photo_id: {
        type: String
    },
    business_id: {
        type: String
    },
    label: {
        type: String
    }
});

module.exports = mongoose.model('Photo', photoSchema, "photo");