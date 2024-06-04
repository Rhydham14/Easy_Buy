import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../css/Products.css";
import axiosInstance from "../axios/instance";
import { Navigate, Link } from "react-router-dom";

const Products = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/product/readProduct");
        setProducts(response.data);
      } catch (error) {
        setError(error.message); // or you can customize error handling based on the error object
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code goes here (if needed)
    };
  }, []);

  // Assuming cat is an array of categories
  const cat = [ 'Home-Kitchen',"Electric"];

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  // const handleClick = async(_id)=>{
  //   try {
  //     navigate(`/details/$_id`);
  //   } catch (error) {
  //     setError(error.message); // or you can customize error handling based on the error object
  //   }
  // }

  return (
    <>
      <Container fluid style={{ backgroundColor: "rgba(128, 0, 128, 0.274)", overflowX: "auto" }}>
        <Row>
          <h1 className="text-center text-white mt-2" style={{ backgroundColor: "purple" }}>
            Best Deals
          </h1>
          {cat.map((category, index) => (
            <Col key={index} className="text-center">
              <h2 className="text-white">{category}</h2>
              <Row className="flex-nowrap" style={{ overflowX: "auto" }}> {/* Added overflowX: "auto" */}
                {filterProductsByCategory(category).slice(0, 10).map((product, productIndex) => (
                  <Col key={productIndex} xs={6} md={3} className="mb-4" style={{ maxWidth: "250px" }}> {/* Added style for fixed card width */}
                    <div className="card" id="card-image" style={{ width: "100%", height:"100%" }}> {/* Added style for card width */}
                      <div className="card-body" style={{height:"100%"}}>
                        <Image src={product.images ? product.images : 'defaultImage.jpg'} fluid />
                        <h5 className="card-title">{product.title}</h5>
                        <p>{product.description}</p>
                        <p>₹ {product.price}/-</p>
                        <Link to={`/details/${product._id}`}className="btn text-white"
                          style={{ backgroundColor: "purple" }}>
                            More
                        </Link>
                      </div>
                    </div>
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
