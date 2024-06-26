const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const paymentModel = require("../Models/paymentModel");

const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const paymentDetials = async (paymentIntent, fullname, deliveryAddress) => {
  try {
    const createdPayment = await paymentModel.create({
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      currency: paymentIntent.currency,
      fullname: fullname,
      deliveryAddress: {
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        pinCode: deliveryAddress.pinCode,
      },
    });
    return createdPayment;
  } catch (error) {
    console.error({ error: "Error for transaction" });
    throw new Error(error.message);
  }
};


const showTransactions = async () => {
  try {
    const transactionData = await paymentModel.find({});
    const data = transactionData.map((data) => {
      return {
        id: data.id,
        amount: data.amount,
        status: data.status,
        currency: data.currency,
        createdAt: data.createdAt,
        _id: data._id,
        deliveryAddress: {
          street: data.deliveryAddress.street,
          city: data.deliveryAddress.city,
          state: data.deliveryAddress.state,
          pinCode: data.deliveryAddress.pinCode,
        },
        fullname: data.fullname,
      };
    });
    return data;
  } catch (error) {
    console.error({ error: "Error fetching transactions" });
    throw error;
  }
};

module.exports = {
  createPaymentIntent,
  paymentDetials,
  showTransactions,
};
