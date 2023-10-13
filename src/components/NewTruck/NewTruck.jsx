import React, { useState } from "react";
import "./NewTruck.css";
import TopNav from "../Common/TopNav";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NewTruck() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const Submit = (e) => {
    e.preventDefault();
    console.log("submit button clicked");
    dispatch({
      type: "ADD_TRUCK",
      payload: { make, year, model, truck_number: truckNumber },
    });
    history.push('/dashboard?view=trucks')
  };

  return (
    <div className="newTruck">
      <TopNav />
      <form className="new_truck_form">
        <h1 className="welcome">Add New Truck</h1>
        <div className="group">
          <label htmlFor="make">Make</label>
          <input
            type="text"
            name="make"
            placeholder="Enter Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            name="model"
            placeholder="Enter Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="truck_number">Truck Number</label>
          <input
            type="number"
            name="truck_number"
            placeholder="Enter Truck Number"
            value={truckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
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
        <button
          className="sign_up"
          onClick={(e) => Submit(e)}
          disabled={!make || !year || !model || !truckNumber}
        >
          Add New Truck
        </button>
      </form>
    </div>
  );
}
