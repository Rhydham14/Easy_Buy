const paymentService = require("../Services/paymentService");

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

const paymentDetials = async (req, res) => {
  const { paymentIntent, deliveryAddress, fullname } = req.body;
  try {
    const paymentDetail = await paymentService.paymentDetials(paymentIntent, fullname, deliveryAddress);
    res.status(200).json({ paymentDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal payment error" });
  }
};


const showTransactions = async (req, res) => {
  try {
    const transaction = await paymentService.showTransactions();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Internal payment error" });
  }
};
  

module.exports = {
  createPayment,
  paymentDetials,
  showTransactions,
};
