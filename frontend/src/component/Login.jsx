import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import StoreIcon from "@mui/icons-material/Store";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../slice/authSlice";
import { LOGIN_USER } from "../service/service";
import Navbar from "react-bootstrap/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LOGIN_USER(email, password);
      const { success, message, user, accessToken, refreshToken } = response;
      if (success) {
        dispatch(loginSuccess(user));
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/");
      } else {
        setError(message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      setError("An error occurred. Please try again.");
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
          <h1 className="login" id="login" style={{ color: "purple" }}>
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn text-white mt-2"
              style={{ backgroundColor: "purple" }}
            >
              Submit
            </button>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
