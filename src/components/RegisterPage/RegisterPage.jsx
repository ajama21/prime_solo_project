import React from "react";
import TopNav from "../Common/TopNav";
import './Register.css'

function RegisterPage() {
  return (
    <div
      className="container register_page"
      style={{ backgroundImage: `url('/Freightliner.jpeg')` }}
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
          />
        </div>
        <div className="group">
          <label htmlFor="username">User Name</label>
          <input type="text" name="username" placeholder="Enter User Name" />
        </div>
        <div className="group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter Password" />
        </div>
        <div className="group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" />
        </div>
        <button className="sign_up">Sign-Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
