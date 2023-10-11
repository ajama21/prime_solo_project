import React from "react";
import "./NewTruck.css";
import TopNav from "../Common/TopNav";

export default function NewTruck() {
  return (
    <div className="newTruck">
      <TopNav />
      <form className="new_truck_form">
        <h1 className="welcome">Add New Truck</h1>
        <div className="group">
          <label htmlFor="make">Make</label>
          <input type="text" name="make" placeholder="Enter Make" />
        </div>
        <div className="group">
          <label htmlFor="year">Year</label>
          <input type="number" name="year" placeholder="Enter Year" />
        </div>
        <div className="group">
          <label htmlFor="model">Model</label>
          <input type="text" name="model" placeholder="Enter Model" />
        </div>
        <div className="group">
          <label htmlFor="truck_number">Truck Number</label>
          <input
            type="number"
            name="truck_number"
            placeholder="Enter Truck Number"
          />
        </div>
        <div className="group files">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            placeholder="Add Image"
            accept="image/png, image/jpeg"
          />
        </div>
        <button className="sign_up">Add New Truck</button>
      </form>
    </div>
  );
}
