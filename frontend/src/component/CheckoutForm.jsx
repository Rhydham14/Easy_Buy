import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
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

    if (!clientSecret) {
      setError('Client secret not found');
      setLoading(false);
      return;
    }

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
      setLoading(false);
    }
  };

  return (
    <Box className="container">
      <Typography variant="h4">Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <Box className="form-group">
          <CardElement />
        </Box>
        <Button type="submit" variant="contained" color="primary" disabled={!stripe || !elements || loading}>
          {loading ? <CircularProgress size={24} /> : 'Pay'}
        </Button>
      </form>
      {error && <Alert severity="error" className="mt-3">{error}</Alert>}
    </Box>
  );
};

export default CheckoutForm;
