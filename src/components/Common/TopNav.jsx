import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export default function TopNav() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header>
      <Link to="/">
        <span className="logo">FLEET-TRACKER</span>
      </Link>
      <div className="topLinks">
        <Link className={location.pathname==="/register" ? "active" : ""} to="/register">Get Started</Link>
        <Link className={location.pathname==="/about" ? "active" : ""}to="/about">About</Link>
        <Link className={location.pathname==="/login" ? "active" : ""}to="/login">Log-in</Link>
      </div>
    </header>
  );
}
