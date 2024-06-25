import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ProductDetails from "./component/ProductDetails";
import Admin from "./component/Adminpage";
import Verify from "./component/Verify";
import Cart from "./component/Cart";
import ProductPage from "./component/Productpage";
import ScrollToTop from "./component/ScrollTop";
import BuyNow from "./component/BuyNow";
import StripeProvider from "../src/component/StripeProvider";
import PaymentSuccess from "../src/component/Success";
import AllTransactions from "../src/component/AllTransaction";

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
        <Route
          path="/buynow/:totalPrice"
          element={
            <StripeProvider>
              <BuyNow />
            </StripeProvider>
          }
        />
        <Route path="/pages/:category" element={<ProductPage />} />
        <Route path="AllTransactions" element={<AllTransactions/>}/>
      </Routes>
    </StripeProvider>
  </Router>
);

export default App;
