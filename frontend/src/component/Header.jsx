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
import { logout, updateProfile } from "../slice/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { UPDATE_USER_PROFILE, SEARCH } from "../service/service";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (user) {
      setEmail(user.email);
      setFullname(user.fullname);
    }
    setShow(true);
  };

  const user = useSelector((state) => state.auth.user);
  const itemsLenght = useSelector((state) => state.cart.items);
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

  const handleProfileUpdate = async () => {
    try {
      const id = user._id;
      console.log("userID", id);
      const responseData = await UPDATE_USER_PROFILE(id, email, fullname);
      handleClose();
      dispatch(updateProfile(responseData.user));
      setSnackbarMessage("Profile updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (e) {
      console.log("error", e);
      setSnackbarMessage("Error updating profile");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
      const response = await SEARCH(query); // Pass query to the SEARCH function
      setSearchResults(response); // Assuming the API returns an array of search results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

const cartValue = ()=>{
  if(user){
    return itemsLenght.length
  }   else{
     return 0;
  } 
}
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">
            <StoreIcon style={{ fontSize: 32, color: "purple" }} />
            easyBuy
          </Navbar.Brand>

          {/* Search bar */}
          <div style={{ flexGrow: 1, maxWidth: "600px", margin: "0 16px" }}>
      <Autocomplete
        freeSolo
        options={searchResults.map((result) => result.title)}
        onInputChange={(event, newInputValue) => {
          handleSearch(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            fullWidth
            style={{ backgroundColor: "white", borderRadius: 4 }}
          />
        )}
      />
    </div>
          {/* End Search bar */}

          <Nav className="ms-auto center">
            <Nav.Link>
              {user && <h6 className="m-2">hello, {user.fullname}</h6>}
            </Nav.Link>

            <NavLink to="/cart">
      {user ? (
        <Badge badgeContent={cartValue()} color="secondary">
          <ShoppingCartIcon
            id="icon-link"
            className="mt-2"
            style={{ fontSize: 32, color: "purple" }}
          />
        </Badge>
      ) : (
        <ShoppingCartIcon
          id="icon-link"
          className="mt-2"
          style={{ fontSize: 32, color: "purple" }}
        />
      )}
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
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
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
          <Button
            onClick={handleProfileUpdate}
            style={{ backgroundColor: "purple" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          style={{ backgroundColor: "purple", color: "white" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Header;
