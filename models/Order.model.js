const mongoose = require('mongoose');

const { AddressSchema } = require('../schemas/Address.Schema')

const OrderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    restaurant: { type: mongoose.Types.ObjectId, required: true, ref: 'restaurant' },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: { type: AddressSchema, required: true },
    status: { type: String, enum: ['placed', 'preparing', 'on the way', 'delivered'], default: 'placed' }
})

const OrderModel = mongoose.model('/order', OrderSchema);

module.exports = {
    OrderModel
}