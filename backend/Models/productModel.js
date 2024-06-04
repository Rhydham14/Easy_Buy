const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: { type: String, required: true }, // Assuming a single image path
});

// Create the Product model using the schema
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
