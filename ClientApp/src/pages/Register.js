import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/Login.css";
import axios from 'axios';
import { Logo } from "../assets/Logo.js";
import { Link } from "react-router-dom";

export const Register = () => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(e) {

    e.preventDefault();
    console.log("Clicked register");

    let data = {
        username: username,
        password,
    };

    let config = {
        method: 'post',
        url: '/User/register',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
    .then(function (response) {
        history.push("/login");
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
          <button onClick={(e) => handleRegister(e)} className="login-btn">
            Register
          </button>
        </div>
        <p style={{ fontFamily: '"Roboto Mono", monospace' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
