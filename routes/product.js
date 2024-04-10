const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: {
        type: String,
        enums: ['starters', 'maincourse'],
        default:'starters'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    images: [{
        type: String
    }],
    description: String
});
productSchema.plugin(plm);
module.exports = mongoose.model('product', productSchema);