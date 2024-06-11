const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const paymentModel = require("../Models/paymentModel");

const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const paymentDetials = async (paymentIntent) => {
  try {
    const createdPayment = await paymentModel.create({
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      currency: paymentIntent.currency,
    });
    return createdPayment;
  } catch (error) {
    console.error({ error: "Error for transaction" });
    throw new Error(error.message); // Re-throw the error to handle it in the calling function
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
        _id: data._id // Added user_id if needed
      };
    });
    return data;
  } catch (error) {
    console.error({ error: "Error fetching transactions" });
    throw error; // Optionally, rethrow the error if you want to handle it further up the call stack
  }
};


module.exports = {
  createPaymentIntent,
  paymentDetials,
  showTransactions
};
