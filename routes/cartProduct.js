const mongoose = require('mongoose');
const product = require('c:/Users/Devansh Gupta/OneDrive/Desktop/node/E-commerce/routes/product');

const cartProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number
    }
});

module.exports = mongoose.model('cartProduct', cartProductSchema);