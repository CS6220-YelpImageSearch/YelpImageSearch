const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
    photo_id: {
        type: String
    },
    imageBase64: {
        type: String
    }
});

module.exports = mongoose.model('Image', imageSchema, "image");