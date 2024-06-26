const OrderModel = require('../Models/orderModel');

const orderlist = async (productDetails) => {
  try {
    const order = new OrderModel({
      title: productDetails.title,
      productId: productDetails._id,
      price: productDetails.price,
      // Add any other required fields
    });
    console.log("orderrrrrr",order);
    await order.save();
  } catch (error) {
    console.error("Error in orderlist service:", error);
    throw error;
  }
};
const getAllOrders = async () => {
  try {
    const orders = await OrderModel.find({});
    return orders;
  } catch (error) {
    console.error("Error in getAllOrders service:", error);
    throw error;
  }
};
module.exports = {
  orderlist,
  getAllOrders
};
