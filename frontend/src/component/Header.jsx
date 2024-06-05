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
import { logout } from '../slice/authSlice';
import { useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import {UPDATE_USER_PROFILE} from "../service/service";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (user) {
      setEmail(user.email);
      setFullname(user.fullname);
    }
    setShow(true);
  };

  const user = useSelector((state) => state.auth.user);

  const itemsLenght = useSelector((state)=> state.cart.items);
  console.log("leng",itemsLenght);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const Categories = [
    { link: "Electronic" },
    { link: "Clothing" },
    { link: "Home-Kitchen" },
    { link: "Tv Screens" },
    { link: "Smart Technology" },
    { link: "Laptops Accessories" },
    { link: "Music Instruments" },
    { link: "Books" },
  ];

  const handleProfileUpdate = async () => {
    try {
      const id = user._id;
      console.log("userID", id);
      const responseData = await UPDATE_USER_PROFILE(id, email, fullname); 
      console.log("Profile updated", responseData);
      handleClose();
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">
            <StoreIcon style={{ fontSize: 32, color: "purple" }} />
            easyBuy
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <button className="btn text-white" style={{ backgroundColor: "purple" }}>Search</button>
          </Form>
          <Nav className="ms-auto center">
            <Nav.Link>
              {user && <h6 className="m-2">hello, {user.fullname}</h6>}
            </Nav.Link>
            
            <NavLink to="/cart">
              <Badge badgeContent={itemsLenght.length} color="secondary">
              <ShoppingCartIcon
                id="icon-link"
                className="mt-2"
                style={{ fontSize: 32, color: "purple" }}
              />
              </Badge>
            </NavLink>
            {user ? (
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
                <NavDropdown.Item>
                  <p onClick={handleShow}>Profile</p>
                </NavDropdown.Item>
                {user.role === "user" && (
                  <NavDropdown.Item>
                    <p onClick={handleAdmin}>Admin portal</p>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
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
            )}
          </Nav>
        </Container>
      </Navbar>
      <div  className="horizontal-scroll-container ">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="profileFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="profileEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleProfileUpdate} style={{ backgroundColor: "purple" }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
