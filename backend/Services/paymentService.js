const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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

module.exports = {
  createPaymentIntent,
};
