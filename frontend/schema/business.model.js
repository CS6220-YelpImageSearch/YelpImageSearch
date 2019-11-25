const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let businessSchema = new Schema({
    business_id: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    postal_code: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    stars: {
        type: String
    },
    review_count: {
        type: String
    },
    is_open: {
        type: String
    }
});

module.exports = mongoose.model('Business', businessSchema, "business");