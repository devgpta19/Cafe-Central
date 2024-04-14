const { privateDecrypt } = require('crypto');
const mongoose = require('mongoose');
const { type } = require('os');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartProduct'
    }],

    price: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('cart', cartSchema);