import React, { useState } from "react";
import RegisterImage from "../../assets/image/woman-8427201_640.webp";
import "../../style/Auth.css";
import { Link, useNavigate } from "react-router-dom";
const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");

  const navigate=useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, branch }),
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setBranch("");
  };

  return (
    <div className="Authorization-container">
      <div className="sign-container">
        <div className="login-container">
          <h2>Registration</h2>
          <p>
            Have an account? <Link to="/">Sign in</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <select
                name="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="branch"
              onChange={(e) => {
                setBranch(e.target.value);
              }}
            />
            <div>
                <button type="submit">Register</button>
            </div>
          </form>
        </div>
        <div>
          <img src={RegisterImage} alt="register" className="register-image" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
