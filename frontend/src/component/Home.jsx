import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Corosel from "./Corosel";
import Container from "react-bootstrap/Container";
import Products from "./Products";
import "../css/Home.css";
import Ads from "./Ads";
import "../css/Loader.css";
import Menu from "../component/Menu";
import Spinner from "react-bootstrap/Spinner";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Menu />
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
