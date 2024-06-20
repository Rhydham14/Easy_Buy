// Import mongoose
const mongoose = require('mongoose');
// const date = require('date-and-time') ;


// Define the Payment schema
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
    default: Date.now, // Set default value to current date/time
  },

});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

// Export the Payment model
module.exports = Payment;
