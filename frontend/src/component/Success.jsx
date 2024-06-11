// src/component/PaymentSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const PaymentSuccess = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your purchase. Your payment has been processed successfully.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
