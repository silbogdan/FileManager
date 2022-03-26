import React from "react";
import { Logo } from "../assets/Logo";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export const HomePage = () => {
  return (
    <div className="container">
      <div style={{ width: "150px" }}>
        <Logo />
      </div>

      <div className="container-lgn-regist">
        <Link to="/login" className="btn-log-regist">
          Login
        </Link>
        <br />
        <Link
          to="/register"
          className="btn-log-regist"
          style={{ width: "350px" }}
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};
