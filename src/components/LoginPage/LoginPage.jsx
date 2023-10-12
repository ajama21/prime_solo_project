import React, { useState } from "react";
import TopNav from "../Common/TopNav";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    console.log("submit button clicked");
    dispatch({
      type: "LOGIN",
      payload: { username: userName, password },
    });
  };

  return (
    <div
      className="container register_page"
      style={{ backgroundImage: `url('/Freightliner.jpeg')` }}
    >
      <TopNav />
      <form className="register_form">
        <h1 className="welcome">Welcome</h1>
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

        <button
          className="sign_up"
          onClick={(e) => Submit(e)}
          disabled={!userName || !password}
        >
          Log-in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
