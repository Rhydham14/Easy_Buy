import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import verifyImg from '../images/verify.jpeg';
import { Col, Container, Row } from "react-bootstrap";
const Verify=()=>{
 return(<>
    <Container>

        
                <img src={verifyImg} alt="" className="w-25 mx-auto d-block pt-5"/>
                <h1 className="text-center">Please check your mail for Verifcation</h1>
  
    </Container>
 </>);
}
export default Verify;