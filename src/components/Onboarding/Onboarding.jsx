import React, { useEffect, useState } from "react";
import TopNav from "../Common/TopNav";
import "./Onboarding.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

export default function Onboarding() {
  const dispatch = useDispatch();
  const [truckNumber, setTruckNumber] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const { search } = useLocation();

  const trucks = useSelector((store) => store.unassignedtrucks);

  useEffect(() => {
    dispatch({ type: "FETCH_UNASSIGNED_TRUCKS" });
  }, []);

  useEffect(() => {
    setTruckNumber(trucks[0]?.truck_number);
  }, [trucks]);

  const driverDetails = useSelector((store) => store.driverdetails);
  console.log('SMOKE', driverDetails);
  
  useEffect(() => {
    if (search && driverDetails) {
      setName(driverDetails.name)
      setTruckNumber(driverDetails.truck_number)
    }
  }, [driverDetails]);

  useEffect(() => {
    if (search) {
      dispatch({ type: "FETCH_DRIVER_DETAILS", payload: search.split("=")[1] });
    }
  }, [dispatch]);

  const updateDriver = (e) => {
    e.preventDefault();
    const updatedDriver = {
      application_link: driverDetails.application_link,
      license_link: driverDetails.license_link,
      dot_link: driverDetails.dot_link,
      company_policy_link: driverDetails.company_policy_link,
      drug_alcohol_link: driverDetails.drug_alcohol_link,
      name,
      truck_number: truckNumber,
      id: search.split("=")[1]
    }
    console.log(updatedDriver,'UPDAAAAATED DRIVER');
    dispatch({ type: "UPDATE_DRIVER_DETAILS", payload: updatedDriver });
    history.goBack()
  }

  const addNewDriver = (e) => {
    e.preventDefault();
    console.log(truckNumber);
    const driver = {
      truck_number: truckNumber,
      application_link:
        "https://formspal.com/data/LandingPageImages/Image/2/245/245856.JPEG",
      license_link: "https://m.media-amazon.com/images/I/61k+xMg3I7L.jpg",
      dot_link:
        "https://www.smart-trucking.com/wp-content/uploads/2020/08/dot-medical-card.webp",
      company_policy_link:
        "https://help.signrequest.com/hc/article_attachments/360013605300/What_is_the_signing_log.jpg",
      drug_alcohol_link:
        "https://plumsail.com/docs/documents/v1.x/_images/signed-contract-docusign.png",
      name,
    };
    console.log(driver);
    dispatch({
      type: "ADD_DRIVER",
      payload: driver,
    });
    history.push("/dashboard?view=drivers");
  };

  return (
    <div>
      <TopNav />
      <form className="onboardingForm">
        <h1 className="welcome">Add Documents</h1>
        <div className="group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Driver Name"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          {trucks?.length > 0 && (
            <select
              name="select_truck"
              id="select_truck"
              onChange={(e) => setTruckNumber(e.target.value)}
              value={truckNumber}
            >
              {trucks?.map((truck) => (
                <option value={truck.truck_number} key={truck.id}>
                  Truck {truck.truck_number}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          className="sign_up"
          onClick={(e) => (search ? updateDriver(e) : addNewDriver(e))}
          disabled={!truckNumber || !name}
        >
          {search ? "Update" : "Onboard"}
        </button>
      </form>
    </div>
  );
}
