const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress:{
    type: String,
    required:true
  },
  fullname:{
    type:String,
    required: true
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
