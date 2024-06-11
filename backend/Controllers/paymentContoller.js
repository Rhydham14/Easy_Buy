// controllers/paymentController.js
const paymentService = require('../Services/paymentService');

const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await paymentService.createPaymentIntent(amount);
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
};
