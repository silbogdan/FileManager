import React from "react";
import "../styles/Login.css";
import { Logo } from "../assets/Logo.js";
import { Link } from "react-router-dom";

export const Login = () => {
  function handleLogin(e) {
    e.preventDefault();
    console.log("Clicked login");
  }

  return (
    <div className="container-login">
      <div className="login-box">
        <div className="login-input-container">
          <div style={{ width: "50px", height: "50px" }}>
            <Logo />
          </div>
          <h3
            style={{
              marginBottom: "40px",
              fontFamily: '"Roboto Mono", monospace',
              fontWeight: "700",
            }}
          >
            Login to File Manager
          </h3>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            style={{ marginBottom: "20px" }}
          ></input>
          <button onClick={(e) => handleLogin(e)} className="login-btn">
            Login
          </button>
        </div>
        <p style={{ fontFamily: '"Roboto Mono", monospace' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
