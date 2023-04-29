const express = require('express');
require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { UserModel } = require('../models/User.model')
const { authentication } = require('../middlewares/authentication')
const { restaurantRouter } = require('./restaurants.router')
const { ordersRouter } = require('./orders.router')

const router = express.Router();

router.use('/restaurants', restaurantRouter)

router.use('/orders', ordersRouter)

router.post('/register', async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).send({ message: 'User Already Registerd' });
        }
        bcrypt.hash(password, +process.env.saltRounds, async function (err, hash) {
            if (err) {
                return res.status(501).send({ message: err.message })
            }
            try {
                const user = new UserModel({
                    name, email, password: hash, address
                })
                await user.save();
                return res.status(201).send({ message: 'User Registered Sucessfully' })
            } catch (error) {
                return res.status(501).send({ message: error.message })
            }
        });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and Password Required' });
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User Not Registered' });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(501).send({ message: err.message });
            }
            if (!result) {
                return res.status(401).send({ message: 'Wrong Credentials' });
            }
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.privateKey);
            return res.status(201).send({ message: 'User Login Sucessfully', token })
        });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

router.patch('/user/:id/reset', async (req, res) => {
    const { id } = req.params;
    const { old_password, new_password } = req.body;
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        bcrypt.compare(old_password, user.password, function (err, result) {
            if (err) {
                return res.status(501).send({ message: err.message });
            }
            if (!result) {
                return res.status(401).send({ message: 'Old Password Does not match' });
            }
            bcrypt.hash(new_password, +process.env.saltRounds, async function (err, hash) {
                if (err) {
                    return res.status(501).send({ message: err.message });
                }
                try {
                    await UserModel.findOneAndUpdate({ _id: id }, { password: hash });
                    return res.status(204).send({ message: 'Password Updated' })
                } catch (error) {
                    return res.status(501).send({ message: error.message })
                }
            });
        });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    router
}