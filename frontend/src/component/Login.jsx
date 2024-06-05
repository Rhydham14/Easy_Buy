import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import StoreIcon from "@mui/icons-material/Store";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../slice/authSlice";
import {LOGIN_USER} from "../service/service";

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
      console.log("*****", response);
      const { success, message, user } = response;
      if (success) {
        dispatch(loginSuccess(user));
        console.log(message);
        navigate('/');
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
      <h1 className="text-center">
        <StoreIcon style={{ fontSize: 40, color: "purple" }} />
        easyBuy
      </h1>
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
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
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
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn text-white mt-2" style={{ backgroundColor: 'purple' }}>
              Submit
            </button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
