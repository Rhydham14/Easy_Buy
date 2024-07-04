const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    items:{type:Number, required:true}
});

const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel;