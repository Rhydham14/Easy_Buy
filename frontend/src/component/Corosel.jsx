import React from "react";
import { Carousel } from "react-bootstrap";
import image2 from "../images/w1.jpg";
import image3 from "../images/bag.jpg";
import image6 from "../images/clothing.jpg";
import image7 from "../images/electronics.jpg";
import image8 from "../images/phone.jpg";
import CustomCarousel from "../utils/styles";
import { Container } from "react-bootstrap";
import { Typography } from "@mui/material";

const Corosel = () => {
  return (
    <>
      <CustomCarousel interval={1000}>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image6} alt="Third slide" />
        </Carousel.Item>   <Carousel.Item>
          <img className="d-block w-100" src={image7} alt="Third slide" />
        </Carousel.Item>   <Carousel.Item>
          <img className="d-block w-100" src={image8} alt="Third slide" />
        </Carousel.Item>
      </CustomCarousel>
      <Container>
        <Typography> </Typography>
      </Container>
    </>
  );
};
export default Corosel;
