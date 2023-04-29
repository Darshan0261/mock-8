const express = require('express');

const { authentication } = require('../middlewares/authentication');
const { RestaurantModel } = require('../models/Restaurant.model');
const { OrderModel } = require('../models/Order.model');
const { UserModel } = require('../models/User.model');

const ordersRouter = express.Router();

ordersRouter.get('/', authentication, async (req, res) => {
    const { token } = req.body;
    try {
        const orders = await OrderModel.find({ user: token.id });
        res.send(orders);
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

ordersRouter.post('/', authentication, async (req, res) => {
    const { token } = req.body;
    const { restaurant_id, cart } = req.body;
    try {
        const user = await UserModel.findOne({ _id: token.id })
        const restaurant = await RestaurantModel.findOne({ _id: restaurant_id });
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant Not Found' });
        }
        let menu = restaurant.menu;
        let order = [];
        let flag = true;
        let total = 0;
        cart.forEach(item => {
            menu.forEach(ele => {
                if (item.item_id == ele._id) {
                    let obj = {
                        name: ele.name,
                        price: ele.price,
                        quantity: item.quantity
                    }
                    total = total + ele.price * item.quantity;
                    order.push(obj);
                }
            })
        })
        const new_order = new OrderModel({
            user: token.id,
            restaurant: restaurant_id,
            items: order,
            totalPrice: total,
            deliveryAddress: user.address
        });
        await new_order.save();
        res.status(201).send({ message: 'Order Placed Sucessfully', order_id: new_order._id })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

ordersRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await OrderModel.findOne({ _id: id });
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        return res.send(order)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

ordersRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).send({ message: 'Status Required' })
    }
    try {
        const order = await OrderModel.findOne({ _id: id });
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        res.status(204).send({ message: 'Order Status Updated' })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    ordersRouter
}