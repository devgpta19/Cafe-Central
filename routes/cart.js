const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartProduct'
    }]
})

module.exports = mongoose.model('cart', cartSchema);