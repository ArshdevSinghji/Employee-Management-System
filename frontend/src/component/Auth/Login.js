import React, { useContext, useState } from "react";
import LoginImage from "../../assets/image/woman-9009013_640.webp";

import "../../style/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../services/api";

import { LoginContext } from "../context/LoginContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn, setRole } = useContext(LoginContext);

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      setLoggedIn(data.id);
      setRole(data.role);
      setAuthToken(data.token);
      
      localStorage.setItem("token",data.token);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="Authorization-container">
      <div className="sign-container">
        <div className="login-container">
          <h2>Login</h2>
          <p>
            Doesn't have an account yet? <Link to="/register"> Sign up</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email Adderess</label>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div>
          <img src={LoginImage} alt="register" className="register-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
