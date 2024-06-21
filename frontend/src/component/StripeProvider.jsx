import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PQ1j6GA2pbR0DI2yzPZRiCN1fFoEzrTvE0ZbIomxfI4rvKtDHssnnZoEvDDQyAP2UHMkjfqPywMqYmaEfXJi1cK00K572Tg6I"
);

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
