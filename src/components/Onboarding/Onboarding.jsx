import React from "react";
import TopNav from "../Common/TopNav";
import "./Onboarding.css";

export default function Onboarding() {
  return (
    <div>
      <TopNav />
      <form className="onboardingForm">
      <h1 className="welcome">Add Documents</h1>
        <div className="group files">
          <label htmlFor="application">Application</label>
          <input
            type="file"
            name="application"
            placeholder="Enter Application Link"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="group files">
          <label htmlFor="drivers_license">Drivers License</label>
          <input
            type="file"
            name="drivers_license"
            placeholder="Enter Drivers License"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="group files">
          <label htmlFor="dot">Physical DOT Card</label>
          <input type="file" name="dot" placeholder="Enter dot" />
        </div>
        <div className="group files">
          <label htmlFor="drug_alcohol">Drug and Alcohol Questionare</label>
          <input
            type="file"
            name="drug_alcohol"
            placeholder="Enter Drug and Alcohol Questionare"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="group files">
          <label htmlFor="company_policy">Signed Company Policy Document</label>
          <input
            type="file"
            name="company_policy"
            placeholder="Enter Signed Company Policy Document"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="group files" style={{ justifyContent: "flex-start" }}>
          <label htmlFor="select_truck">Select a Truck</label>
          <select name="select_truck" id="select_truck">
            <option value="123">Truck 123</option>
            <option value="456">Truck 456</option>
            <option value="789">Truck 789</option>
            <option value="000">Truck 000</option>
          </select>
        </div>
        <button className="sign_up">Onboard</button>
      </form>
    </div>
  );
}
