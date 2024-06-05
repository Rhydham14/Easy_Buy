import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Corosel from "./Corosel";
import Container from "react-bootstrap/Container";
import Products from "./Products";
import "../css/Home.css";
import Ads from "./Ads";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Container fluid>
        <Corosel />
        <Ads />
        <Products />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
