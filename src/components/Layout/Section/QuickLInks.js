import "./Quicklinks.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Indicators.css";
function Quiclinks() {
  const [option, setoption] = useState(1);
  return (
    <div className="navbar2 text-center">
      <Link to="/">
        <a
          onClick={() => {
            setoption(1);
          }}
          className={
            option === 1 ? "selection text-dark" : "nav-link text-dark"
          }
        >
          Home
        </a>
      </Link>
      <Link to="/app/AboutUs">
        <a
          onClick={() => {
            setoption(2);
          }}
          className={
            option === 2 ? "selection text-dark" : "nav-link text-dark"
          }
        >
          About Us
        </a>
      </Link>
      <Link to="/app/latest">
        <a
          onClick={() => {
            setoption(3);
          }}
          className={
            option === 3 ? "selection text-dark" : "nav-link text-dark"
          }
        >
          Latest
        </a>
      </Link>
      <Link to="/app/Indicators">
        <a
          onClick={() => {
            setoption(4);
          }}
          className={
            option === 4 ? "selection text-dark" : "nav-link text-dark"
          }
        >
          Indicators
        </a>
      </Link>
      <Link to="/app/Timeline">
        <a
          onClick={() => {
            setoption(5);
          }}
          className={
            option === 5 ? "selection text-dark" : "nav-link text-dark"
          }
        >
          Startup
        </a>
      </Link>

      <Link to="/app/Contact">
        <a
          onClick={() => {
            setoption(6);
          }}
          className={
            option === 6 ? "selection text-dark" : "nav-link text-dark"
          }
        >
          Contact Us
        </a>
      </Link>
    </div>
  );
}

export default Quiclinks;
