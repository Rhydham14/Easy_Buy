import React from "react";
import { Carousel} from "react-bootstrap";
import image2 from "../images/w1.jpg";
import image3 from "../images/bag.jpg";
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
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image3} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image5} alt="Third slide" />
          </Carousel.Item>
        </CustomCarousel>
      <Container>
        <Typography> </Typography>
      </Container>
    </>
  );
};
export default Corosel;