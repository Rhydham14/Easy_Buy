import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "./Header";
import Footer from "./Footer";
import Corosel from "./Corosel";
import Container from "react-bootstrap/Container";
import Products from "./Products";
import "../css/Home.css";
import Ads from "./Ads";
import "../css/Loader.css";
import Menu from "../component/Menu";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const socket = io(); // Initialize socket connection

    // Listening for a custom event from the server
    socket.on("customEvent", (data) => {
      console.log(data.message);
    });

    // Emitting a custom event to the server
    socket.emit("clientEvent", { message: "Hello from client!" });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChatShow = () => setShowChat(true);
  const handleChatClose = () => setShowChat(false);

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Menu />
      <Container fluid>
        <Corosel />
        <Ads />
        <Products />
      </Container>
      <Button
        onClick={handleChatShow}
        style={{
          position: "fixed",
          bottom: "44px",
          backgroundColor: "#a30784",
          right: "20px",
          zIndex: 1000,
          borderRadius: "15px 15px 0px 15px",
          borderColor: "#a30784",
          padding:"12px"
        }}
      >
        ChatBot
      </Button>
      <Footer />
      <Modal show={showChat} onHide={handleChatClose} >
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Ask me!</Form.Label>
              <Form.Control type="text" placeholder="Enter your message" className="mt-5"/>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
