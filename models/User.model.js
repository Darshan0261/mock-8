const mongoose = require('mongoose');
const { AddressSchema } = require('../schemas/Address.Schema')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: AddressSchema, required: true }
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel
}