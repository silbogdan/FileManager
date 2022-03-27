import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { Logo } from "../assets/Logo.js";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    let data = {
      username: username,
      password,
    };

    let config = {
      method: "post",
      url: "/User/authenticate",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let token = JSON.stringify(response.data["token"]);
        const decodedToken = jwt_decode(token);
        decodedToken.hosts = JSON.parse(decodedToken.hosts);
        localStorage.setItem("token", token);
        history.push("/files");
      })
      .catch(function (error) {
        console.log(error);
      });
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            style={{ marginBottom: "20px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
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
