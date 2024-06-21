import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Ads.css";
import { Container } from "react-bootstrap";
import summer from "../images/summer.jpeg";
import summer1 from "../images/summer1.jpeg";
import summer2 from "../images/summer2.jpeg";
import summer3 from "../images/summer3.jpeg";
import sale1 from "../images/sale1.jpeg";
import sale2 from "../images/sale2.jpeg";
import sale3 from "../images/sale3.jpeg";
import sale4 from "../images/sale4.jpeg";

const Ads = () => {
  const Summer = [
    { img: summer },
    { img: summer1 },
    { img: summer2 },
    { img: summer3 },
  ];
  const Sale = [{ img: sale1 }, { img: sale2 }, { img: sale3 }, { img: sale4 }];

  return (
    <Container fluid>
      <Row>
        <h1
          className="text-center text-white mt-2"
          style={{ backgroundColor: "purple" }}
        >
          Best Offers
        </h1>
        <Col className="text-center">
          <h2>Summer Deals</h2>
          <Row>
            {Summer.map((item, index) => (
              <Col key={index} xs={6} md={3} className="mb-4">
                <Image src={item.img} fluid id="dealImg" />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h2>Best Sells</h2>
          <Row>
            {Sale.map((item, index) => (
              <Col key={index} xs={6} md={3} className="mb-4">
                <Image src={item.img} fluid id="dealImg" />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Ads;
