import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import StoreIcon from "@mui/icons-material/Store";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../css/Header.css";
import { useSelector, useDispatch } from "react-redux";
import {logout} from '../slice/authSlice';
import { useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const user = useSelector((state) => state.auth.user);
  console.log("heor",user);

  const dispatch = useDispatch();
  const handleLogout = () =>{
    dispatch(logout());
    navigate("/");
  }
  const handleLogin = () =>{
    navigate("/login");
  }
  const handleAdmin = ()=>{
    navigate("/admin");

  }
  const Categories = [
    { link: "Electronic" },
    { link: "Clothing" },
    { link: "Home & Kitchen" },
    { link: "Best Deals" },
    { link: "Tv & Screens" },
    { link: "Smart Technology" },
    { link: "Laptops & Accessories" },
    { link: "Music Instruments" },
    { link: "Books" },
  ];
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">
            <StoreIcon style={{ fontSize: 32, color: "purple" }} />
            easyBuy
          </Navbar.Brand>
          {/* <b className="text-center">Buy your easy from here</b> */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              />
            <button className="btn text-white" style={{backgroundColor:"purple"}}>Search</button>
          </Form>
          
            <Nav className=" ms-auto center">
            
              <Nav.Link>{
                user &&
              <h6 className="m-2">hello, {user?.fullname}</h6>
              }
              
              </Nav.Link>
              <NavLink to="/cart">
        <ShoppingCartIcon
          id="icon-link"
          className="mt-2"
          style={{ fontSize: 32, color: "purple" }}
        />
      </NavLink>
              {
                user ? 
                <NavDropdown
                title={
                  <>
                    <AccountCircleIcon
                      id="icon-link"
                      className="me-2"
                      style={{ fontSize: 32, color: "purple" }}
                    />
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item >
                  
                  <p onClick={handleShow}>
                  Profile
                  </p>
                </NavDropdown.Item>
                {
                  user.role === "user"&&(
                    <NavDropdown.Item >
                  
                  <p onClick={handleAdmin}>
                  Admin portal
                  </p>
                </NavDropdown.Item>
                  )
                }
                
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown> :
              <NavDropdown
              title={
                <>
                  <AccountCircleIcon
                    id="icon-link"
                    className="me-2"
                    style={{ fontSize: 32, color: "purple" }}
                  />
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleLogin}>Login</NavDropdown.Item>
            </NavDropdown>
              }
              
            </Nav>
        </Container>
   
      </Navbar>
      <Container fluid>
        <div className="horizontal-scroll-container">
          <Nav className="horizontal-navbar">
            {Categories.map((category, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  as={Link}
                  to={`/pages/${category.link}`}
                  id="categoury"
                >
                  {category.link}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="profileFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={user?.fullname}
               
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="profileEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={user?.email}
               
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClose} style={{backgroundColor:"purple"}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Header;
