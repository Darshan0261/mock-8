const mongoose = require('mongoose');
const { AddressSchema } = require('../schemas/Address.Schema');

const RestaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    menu: {
        type: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true }
        }],
        default: []
    }
});

const RestaurantModel = mongoose.model('restaurant', RestaurantSchema);

module.exports = {
    RestaurantModel
}