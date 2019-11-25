const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let photoPlusBusinessSchema = new Schema({
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
    },
    city: {
        type: String
    },
    state: {
        type: String
    }
});

module.exports = mongoose.model('Photo_Plus_Business', photoPlusBusinessSchema, "photo_plus_business");