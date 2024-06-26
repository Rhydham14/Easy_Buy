const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  // Add any other required fields
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
