import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../css/Login.css";
import StoreIcon from "@mui/icons-material/Store";
import { REGISTER_USER } from "../service/service";
import Navbar from "react-bootstrap/Navbar";


const Signup = () => {
  const navigate = useNavigate();
  const [pswd, setPswd] = useState("");
  const [valid, setValid] = useState(false);
  const [cpswd, setCpswd] = useState("");
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "merchant",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPswd(value);
    } else if (name === "cpswd") {
      setCpswd(value);
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (pswd.length >= 8 && cpswd === pswd) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pswd, cpswd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!valid) {
      setErrorMessage("Passwords must match and be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await REGISTER_USER(data);
      console.log("Response data:", response);
      setData({
        fullname: "",
        email: "",
        password: "",
        role: "",
      });
      navigate("/Verify");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
       <Navbar.Brand href="/">
      <h1 className="text-center" href="/">
        <StoreIcon style={{ fontSize: 40, color: "purple" }} />
        easyBuy
      </h1>
      </Navbar.Brand>
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-sm-12 p-5 mx-auto" id="text">
          <h1 className="login" style={{ color: "purple" }}>
            Signup
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                placeholder="Enter Full Name"
                value={data.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={data.email}
                onChange={handleChange}
                required
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={pswd}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpswd">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpswd"
                placeholder="Confirm Password"
                name="cpswd"
                value={cpswd}
                onChange={handleChange}
                required
              />
            </div>
            {!valid && cpswd && (
              <div className="alert alert-danger mt-2" role="alert">
                Passwords must match and be at least 8 characters long
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-2" role="alert">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="btn text-white mt-2"
              style={{ backgroundColor: "purple" }}
            >
              Signup
            </button>
            <p>
              Have an account? <Link to="/login">Login..</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
