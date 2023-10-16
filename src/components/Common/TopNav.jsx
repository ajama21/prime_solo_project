import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

export default function TopNav() {
  const location = useLocation();
  // console.log(location.pathname);
  const [showSideMenu, setShowSideMenu] = useState(false)
  const user = useSelector((store) => store.user);


  return (
    <header>
      <Link to="/">
        <span className="logo" style={{color: !location.pathname.includes('dashboard') ? 'white' : 'black'}}>FLEET-TRACKER</span>
      </Link>
      {!location.pathname.includes('dashboard') && (
        <div className="topLinks">
          <Link
            className={location.pathname === "/register" ? "active" : ""}
            to="/register"
          >
            Get Started
          </Link>
          <Link
            className={location.pathname === "/about" ? "active" : ""}
            to="/about"
          >
            About
          </Link>
          <Link
            className={location.pathname === "/login" ? "active" : ""}
            to="/login"
          >
            Log-in
          </Link>
        </div>
      )}
      {location.pathname.includes('dashboard') && user && (
        <div className="topLinks">
          <svg onClick={() => setShowSideMenu(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>
      )}
      {showSideMenu && <SideMenu close={() => setShowSideMenu(false)}/>}
    </header>
  );
}
