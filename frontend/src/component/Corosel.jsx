import React from "react";
import { Carousel, Image } from "react-bootstrap";
// import image from "../images/w2.jpg";
import image2 from "../images/w1.jpg";
import image3 from "../images/bag.jpg";
// import image4 from "./../../images/toy.jpg";
import image5 from "../images/ai.jpeg";
import CustomCarousel from "../utils/styles";
import { Container } from "react-bootstrap";
import { Typography } from "@mui/material";
 
const Corosel = () => {
  return (
    <>
      
        <CustomCarousel>
          <Carousel.Item>
            <img className="d-block w-100" src={image2} alt="First slide" />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image3} alt="Second slide" />
            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image5} alt="Third slide" />
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </CustomCarousel>
      
      <Container>
        <Typography> </Typography>
      </Container>
    </>
  );
};
export default Corosel;