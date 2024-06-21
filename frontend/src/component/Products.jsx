import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../css/Products.css";
import { Link } from "react-router-dom";
import { FETCH_ALL_PRODUCT } from "../service/service";

const Products = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedProducts = await FETCH_ALL_PRODUCT();
      setProducts(fetchedProducts);
      console.log("product data");
    } catch (error) {
      setError(error.message);
    }
  };

  const cat = ["Home-Kitchen", "Electric", "Clothing"];

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "rgba(128, 0, 128, 0.274)",
          overflowX: "auto",
        }}
      >
        <Row>
          <h1
            className="text-center text-white mt-2"
            style={{ backgroundColor: "purple" }}
          >
            Best Deals
          </h1>
          {cat.map((category, index) => (
            <Col key={index} className="text-center mb-4">
              <h2 style={{ backgroundColor: "white", color: "purple" }}>
                {category}
              </h2>
              <Row
                className="justify-content-center"
                style={{ overflowX: "auto" }}
              >
                {filterProductsByCategory(category)
                  .slice(0, 10)
                  .map((product, productIndex) => (
                    <Col
                      key={productIndex}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-4 "
                    >
                      <Link
                        to={`/details/${product._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card className="h-100 p-4" id="card-image">
                          <Card.Img
                            variant="top"
                            src={
                              product.images
                                ? product.images
                                : "defaultImage.jpg"
                            }
                            style={{ objectFit: "cover", height: "200px" }}
                          />
                          <Card.Body>
                            <Card.Title className="text-truncate">
                              {product.title}
                            </Card.Title>
                            <Card.Text
                              className="text-truncate"
                              style={{ height: "50px", overflow: "hidden" }}
                            >
                              {product.description}
                            </Card.Text>
                            <Card.Text>₹ {product.price}/-</Card.Text>
                            <Button
                              as="div"
                              variant="primary"
                              style={{
                                backgroundColor: "purple",
                                border: "none",
                              }}
                            >
                              More
                            </Button>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Products;
