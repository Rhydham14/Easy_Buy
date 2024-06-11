import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios';

const BuyNow = () => {
  const {totalPrice} = useParams();
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    // Fetch client secret from backend when component mounts or when totalPrice changes
    const fetchClientSecret = async (totalPrice) => {
      try {
        const response = await axios.post('http://localhost:5000/easyBuy.com/api/payment/create-payment-intent', {
          amount: totalPrice * 100, // Convert to cents
        });

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error.message);
        setError('Failed to fetch client secret');
      }
    };

    if (totalPrice) {
      fetchClientSecret(totalPrice); // Pass totalPrice to the function
    }
  }, [totalPrice]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log(">>>>>>",clientSecret)
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      
      setError(error.message);
      setLoading(false);
    } else {
      console.log('Payment successful', paymentIntent);
      navigate("/PaymentSuccess");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardElement">Card Details</label>
          <CardElement id="cardElement" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!stripe || !elements || loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default BuyNow;
