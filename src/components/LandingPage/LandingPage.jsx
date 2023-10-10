import React, { useState } from "react";
import "./LandingPage.css";
import TopNav from "../Common/TopNav";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className="container"
      style={{ backgroundImage: `url('/Freightliner.jpeg')` }}
    >
      <TopNav />
      <div className="landingPage_image">
        <div className="comment">
          <p>“Navigate with Confidence. Fleet-Tracker in Your Hands!”</p>
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
