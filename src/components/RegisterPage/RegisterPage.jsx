import React, { useState } from "react";
import TopNav from "../Common/TopNav";
import "./Register.css";

function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const Submit = (e) => {
    e.preventDefault()
    console.log("submit button clicked");
  };

  return (
    <div
      className="container register_page"
      style={{ backgroundImage: `url('/sideviewtruck.jpeg')` }}
    >
      <TopNav />
      <form className="register_form">
        <h1 className="welcome">Welcome</h1>
        <div className="group">
          <label htmlFor="companyname">Company Name</label>
          <input
            type="text"
            name="companyname"
            placeholder="Enter Company Name"
            required
            minLength={3}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter User Name"
            required
            minLength={3}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            minLength={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="sign_up" onClick={(e)=> Submit(e)} disabled={!companyName || !userName || !password || !email}>Sign-Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
