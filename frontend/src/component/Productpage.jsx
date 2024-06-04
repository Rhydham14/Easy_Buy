import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axios/instance";
import "../css/Products.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/product/productPage?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [category]);

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
          <Header />
      <Container fluid style={{ backgroundColor: "rgba(128, 0, 128, 0.274)", overflowX: "auto" }}>
        <Row>
          <h1 className="text-center text-white mt-2" style={{ backgroundColor: "purple" }}>
            {category} Products
          </h1>
          <Col className="text-center">
            <h2 className="text-white">{category}</h2>
            <Row className="flex-nowrap" style={{ overflowX: "auto" }}>
              {filterProductsByCategory(category).slice(0, 10).map((product, productIndex) => (
                <Col key={productIndex} xs={6} md={3} className="mb-4" style={{ maxWidth: "250px" }}>
                  <div className="card" id="card-image" style={{ width: "100%", height:"100%" }}>
                    <div className="card-body" style={{ height: "100%" }}>
                      <Image src={product.images ? product.images : 'defaultImage.jpg'} fluid />
                      <h5 className="card-title">{product.title}</h5>
                      <p>{product.description}</p>
                      <p>₹ {product.price}/-</p>
                      <Link to={`/details/${product._id}`} className="btn text-white" style={{ backgroundColor: "purple" }}>
                        More
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />

    </>
  );
};

export default ProductPage;
