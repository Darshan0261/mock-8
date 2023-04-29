const express = require('express');
const { RestaurantModel } = require('../models/Restaurant.model')
const restaurantRouter = express.Router();

restaurantRouter.get('/', async (req, res) => {
    try {
        const rest = await RestaurantModel.find();
        res.send(rest)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

restaurantRouter.post('/add', async (req, res) => {
    const payload = req.body;
    try {
        const rest = new RestaurantModel(payload);
        await rest.save();
        res.status(201).send({ message: 'Restaurant Added' });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

restaurantRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await RestaurantModel.findOne({ _id: id });
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant Not Found' });
        }
        return res.send(restaurant)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

restaurantRouter.get('/:id/menu', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await RestaurantModel.findOne({ _id: id });
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant Not Found' });
        }
        let menu = restaurant.menu;
        return res.send(menu)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

restaurantRouter.post('/:id/menu', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const restaurant = await RestaurantModel.findOne({ _id: id });
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant Not Found' });
        }
        restaurant.menu.push(payload);
        await restaurant.save();
        res.status(201).send({message: 'New Item added to Menu'})
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

restaurantRouter.delete('/:resid/menu/:itemid', async (req, res) => {
    const res_id = req.params['resid'];
    const item_id = req.params['itemid'];
    try {
        const restaurant = await RestaurantModel.findOne({ _id: res_id });
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant Not Found' });
        }
        await RestaurantModel.findByIdAndUpdate({
            _id: res_id
        }, {
            $pull: {
                menu: { _id: item_id }
            }
        })
        res.status(202).send({message: 'Item Removed From Menu'})
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    restaurantRouter
}