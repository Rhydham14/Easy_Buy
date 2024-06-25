import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyImg from "../images/verify.jpeg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Container, Div } from "react-bootstrap";
const Verify = () => {
  return (
    <>
      <Container>
        <img src={verifyImg} alt="" className="w-25 mx-auto d-block pt-5" />
        <h1 className="text-center">Please check your mail for Verifcation</h1>
        <div className="d-flex justify-content-center align-items-center">

        <Button component={Link}   to="/" variant="contained" style={{backgroundColor:'purple', color:'white', alignItems:'center'}}>
        Back to Home
      </Button> 
        </div>
      </Container>

    </>
  );
};
export default Verify;
