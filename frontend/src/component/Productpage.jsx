import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../css/Products.css";
import Header from "./Header";
import Footer from "./Footer";
import { FETCH_PRODUCT_CATEGORY } from "../service/service";
import Menu from "../component/Menu";
import "../css/Loader.css";

const ProductPage = () => {
  const styles = {
    truncatedDescription: {
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "normal",
    },
    truncatedTitle: {
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "normal",
    },
  };

  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await FETCH_PRODUCT_CATEGORY(category);
        setProducts(fetchedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const filteredProducts = filterProductsByCategory(category).filter(
    (product) => {
      return (
        (filterTitle === "" ||
          product.title.toLowerCase().includes(filterTitle.toLowerCase())) &&
        (filterPrice === "" || product.price <= parseFloat(filterPrice))
      );
    }
  );

  const handleTitleChange = (e) => {
    setFilterTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setFilterPrice(e.target.value);
  };

  const clearFilters = () => {
    setFilterTitle("");
    setFilterPrice("");
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <Container fluid className="bg-light">
        <Header />
        <Menu />
        <h1
          style={{ backgroundColor: "purple", color: "white" }}
          className="text-center mt-2 py-2"
        >
          {category} Products
        </h1>
        <Row className="justify-content-center mb-4">
          <Col xs={12} sm={6} md={4} className="mb-2 ">
            <Form.Group controlId="filterTitle">
              <Form.Label>Filter by Title</Form.Label>
              <Form.Control
                type="text"
                value={filterTitle}
                onChange={handleTitleChange}
                placeholder="Enter title"
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-2">
            <Form.Group controlId="filterPrice">
              <Form.Label>Filter by Price</Form.Label>
              <Form.Control
                type="number"
                value={filterPrice}
                onChange={handlePriceChange}
                placeholder="Enter maximum price"
              />
            </Form.Group>
          </Col>
          <Col xs={12} className="text-center">
            <Button variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {filteredProducts.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link
                to={`/details/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card h-100" id="card-image">
                  <div className="card-body">
                    <Image
                      src={product.images ? product.images : "defaultImage.jpg"}
                      fluid
                      className="w-100"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <h5
                      className="card-title mt-3"
                      style={styles.truncatedTitle}
                    >
                      {product.title}
                    </h5>
                    <p
                      className="card-text"
                      style={styles.truncatedDescription}
                    >
                      {product.description}
                    </p>
                    <p className="card-text">₹ {product.price}/-</p>
                    <Link
                      to={`/details/${product._id}`}
                      className="btn mt-auto"
                      style={{ backgroundColor: "purple", color: "white" }}
                    >
                      More
                    </Link>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductPage;
