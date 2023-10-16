import React, { useState } from "react";
import "./LandingPage.css";
import TopNav from "../Common/TopNav";
import { Link } from "react-router-dom";

function LandingPage() {
  return (

    <div
      className="container"
      style={{ backgroundImage: `url('https://tfltruck.com/wp-content/uploads/2021/02/2022-freightliner-eCascadia-driving.jpeg')` }}
    >
      <div className="overlay"></div>
      <TopNav />
      <div className="landingPage_image">
        <div className="comment">
          <h1>“Navigate with Confidence. Fleet-Tracker in Your Hands!”</h1>
        </div>
        <div className="hero_buttons">
          <Link className="hero_button register" to="/register">
            Get Started
          </Link>
          <Link className="hero_button login" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
