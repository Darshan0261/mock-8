const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true }
})


module.exports = {
    AddressSchema
}