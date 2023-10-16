import React, { useState, useEffect } from "react";
import "./NewTruck.css";
import TopNav from "../Common/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

export default function NewTruck() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const history = useHistory();
  const { search } = useLocation();


  const dispatch = useDispatch();

  const truckDetails = useSelector((store) => store.truckdetails);

  useEffect(() => {
    if (search && truckDetails) {
      setMake(truckDetails.make)
      setModel(truckDetails.model)
      setYear(truckDetails.year)
      setTruckNumber(truckDetails.truck_number)
    }
  }, [truckDetails, search]);

  const updateTruck = (e) => {
    e.preventDefault();
    const updatedTruck = {
      make,
      year,
      model,
      truck_image_link: truckDetails.truck_image_link,
      truck_number: truckNumber,
      id: search.split("=")[1]
    }
    console.log(updatedTruck,'UPDAAAAATED DRIVER');
    dispatch({ type: "UPDATE_TRUCK_DETAILS", payload: updatedTruck });
    history.goBack()
  }

  useEffect(() => {
    if (search) {
      dispatch({ type: "FETCH_TRUCK_DETAILS", payload: search.split("=")[1] });
    }
  }, [dispatch]);


  const submit = (e) => {
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
          onClick={(e) => (search ? updateTruck(e) : submit(e))}
          disabled={!make || !year || !model || !truckNumber}
        >
          {search ? "Update Truck" : "Add New Truck"}
        </button>
      </form>
    </div>
  );
}
