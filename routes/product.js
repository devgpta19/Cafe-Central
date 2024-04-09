const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    images: [{
        type: String
    }],
    description: String
});

module.exports = mongoose.model('product', productSchema);