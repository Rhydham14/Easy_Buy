import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../css/Products.css";
import { Link } from "react-router-dom";
import {FETCH_ALL_PRODUCT} from "../service/service";

const Products = () => {

  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await FETCH_ALL_PRODUCT(); 
        setProducts(fetchedProducts);
      } catch (error) {
        setError(error.message); 
      }
    };

    fetchData();

   
    return;
  }, []);

  // Assuming cat is an array of categories
  const cat = [ 'Home-Kitchen',"Electric"];

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

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
                  <Col key={productIndex} xs={6} md={3} className="mb-4" style={{ maxWidth: "250px" }}> 
                  <Link to={`/details/${product._id}`} style={{textDecoration:"none"}}>
                
                    <div className="card"  id="card-image" style={{ width: "100%", height:"100%" }}> {/* Added style for card width */}
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
