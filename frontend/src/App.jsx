import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import ProductDetails from './component/ProductDetails';
import Admin from './component/Adminpage';
import Verify from './component/Verify';
import Cart from './component/Cart';
import ProductPage from './component/Productpage';
import ScrollToTop from "./component/ScrollTop";
import BuyNow from "./component/BuyNow";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import StripeProvider from '../src/component/StripeProvider'; // Assuming the file path is correct
import PaymentSuccess from "../src/component/Success";
// const stripePromise = loadStripe('pk_test_51PQ1j6GA2pbR0DI2yzPZRiCN1fFoEzrTvE0ZbIomxfI4rvKtDHssnnZoEvDDQyAP2UHMkjfqPywMqYmaEfXJi1cK00K572Tg6I');

const App = () => (
  <Router>
    <StripeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:_id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buynow/:totalPrice" element={<StripeProvider><BuyNow /></StripeProvider>} />
        <Route path="/pages/:category" element={<ProductPage />} />
      </Routes>
    </StripeProvider>
  </Router>
);

export default App;
