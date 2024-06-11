import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PAYMENT } from '../service/service'; // Ensure the correct import path
import {useParams} from "react-router-dom";
const BuyNow = () => {
  const totalPrice = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch client secret from backend when component mounts or when totalPrice changes
    const fetchClientSecret = async () => {
      try {
        console.log("jheeee", totalPrice); 
        const response = await fetch('http://localhost:5000/easyBuy.com/api/payment/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: totalPrice * 100 }), // Convert to cents
        });

        if (!response.ok) {
          throw new Error('Failed to fetch client secret');
        }

        const data = await response.json();
        console.log("????????",data.clientSecret);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error.message);
        setError('Failed to fetch client secret');
      }
    };

    fetchClientSecret();
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
      debugger
      setError(error.message);
      setLoading(false);
    } else {
      console.log('Payment successful', paymentIntent);
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
