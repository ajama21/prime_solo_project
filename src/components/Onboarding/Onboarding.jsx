import React, { useEffect, useState } from "react";
import TopNav from "../Common/TopNav";
import "./Onboarding.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { uploadOne } from "../Upload/Upload";

export default function Onboarding() {
  const dispatch = useDispatch();
  const [truckNumber, setTruckNumber] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);

  const [applicationLinkFile, setApplicationLinkFile] = useState(null);
  const [driversLicesnseFile, setDriversLicenseFile] = useState(null);
  const [dotFile, setDotFile] = useState(null);
  const [questionnaireFile, setQuestionnaireFile] = useState(null);
  const [policyFile, setPolicyFile] = useState(null);

  const trucks = useSelector((store) => store.unassignedtrucks);

  useEffect(() => {
    dispatch({ type: "FETCH_UNASSIGNED_TRUCKS" });
  }, []);

  useEffect(() => {
    setTruckNumber(trucks[0]?.truck_number);
  }, [trucks]);

  const driverDetails = useSelector((store) => store.driverdetails);
  console.log("SMOKE", driverDetails);

  useEffect(() => {
    if (search && driverDetails) {
      setName(driverDetails.name);
      setTruckNumber(driverDetails.truck_number);
    }
  }, [driverDetails]);

  useEffect(() => {
    if (search) {
      dispatch({ type: "FETCH_DRIVER_DETAILS", payload: search.split("=")[1] });
    }
  }, [dispatch]);

  const updateDriver = (e) => {
    e.preventDefault();
    setLoading(true)
    const updatedDriver = {
      application_link: driverDetails.application_link,
      license_link: driverDetails.license_link,
      dot_link: driverDetails.dot_link,
      company_policy_link: driverDetails.company_policy_link,
      drug_alcohol_link: driverDetails.drug_alcohol_link,
      name,
      truck_number: truckNumber,
      id: search.split("=")[1],
    };
    dispatch({ type: "UPDATE_DRIVER_DETAILS", payload: updatedDriver });
    setLoading(false);
    window.alert('Driver updated successfully!');
    history.goBack();
  };

  const addNewDriver = async (e) => {
    e.preventDefault();
    // Validation check if we have all the data
    if(!applicationLinkFile || !driversLicesnseFile || !dotFile || !policyFile || !questionnaireFile || !truckNumber || !name){
      window.alert('Please fill all required fields!')
      return
    }
    setLoading(true)
    console.log(truckNumber);
    // upload all files and get the links
    const applicationLinkLink = await uploadOne(applicationLinkFile);
    const driversLicesnseLink = await uploadOne(driversLicesnseFile);
    const dotLink = await uploadOne(dotFile);
    const policy_Link = await uploadOne(policyFile);
    const questionnaireLink = await uploadOne(questionnaireFile);
    const driver = {
      truck_number: truckNumber,
      application_link: applicationLinkLink,
      license_link: driversLicesnseLink,
      dot_link: dotLink,
      company_policy_link: policy_Link,
      drug_alcohol_link: questionnaireLink,
      name,
    };
    console.log(driver);
    dispatch({
      type: "ADD_DRIVER",
      payload: driver,
    });
    setLoading(false);
    window.alert('Driver added successfully!')
    history.push("/dashboard?view=drivers");
  };

  const getPreviewObjectUrl = (file) => {
    return URL.createObjectURL(file);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dashboard_input"
          />
        </div>
        <div className="group files">
          <label htmlFor="application">Application</label>
          <input
            type="file"
            name="application"
            placeholder="Enter Application Link"
            accept="image/png, image/jpeg"
            className="dashboard_input"
            onChange={(e) => setApplicationLinkFile(e.target.files[0])}
          />
          {applicationLinkFile && (
            <img
              src={getPreviewObjectUrl(applicationLinkFile)}
              width={100}
              height={100}
            />
          )}
          {applicationLinkFile && (
            <div className="action_buttons">
              <button
                onClick={(e) => [
                  e.preventDefault(),
                  setApplicationLinkFile(null),
                ]}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="group files">
          <label htmlFor="drivers_license">Drivers License</label>
          <input
            type="file"
            name="drivers_license"
            placeholder="Enter Drivers License"
            accept="image/png, image/jpeg"
            className="dashboard_input"
            onChange={(e) => setDriversLicenseFile(e.target.files[0])}
          />
          {driversLicesnseFile && (
            <img
              src={getPreviewObjectUrl(driversLicesnseFile)}
              width={100}
              height={100}
            />
          )}
          {driversLicesnseFile && (
            <div className="action_buttons">
              <button
                onClick={(e) => [
                  e.preventDefault(),
                  setDriversLicenseFile(null),
                ]}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="group files">
          <label htmlFor="dot">Physical DOT Card</label>
          <input
            type="file"
            name="dot"
            placeholder="Enter dot"
            className="dashboard_input"
            onChange={(e) => setDotFile(e.target.files[0])}
          />
          {dotFile && (
            <img src={getPreviewObjectUrl(dotFile)} width={100} height={100} />
          )}
          {dotFile && (
            <div className="action_buttons">
              <button onClick={(e) => [e.preventDefault(), setDotFile(null)]}>
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="group files">
          <label htmlFor="drug_alcohol">Drug and Alcohol Questionare</label>
          <input
            type="file"
            name="drug_alcohol"
            placeholder="Enter Drug and Alcohol Questionare"
            accept="image/png, image/jpeg"
            className="dashboard_input"
            onChange={(e) => setQuestionnaireFile(e.target.files[0])}
          />
          {questionnaireFile && (
            <img src={getPreviewObjectUrl(questionnaireFile)} width={100} height={100} />
          )}
          {questionnaireFile && (
            <div className="action_buttons">
              <button
                onClick={(e) => [
                  e.preventDefault(),
                  setQuestionnaireFile(null),
                ]}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="group files">
          <label htmlFor="company_policy">Signed Company Policy Document</label>
          <input
            type="file"
            name="company_policy"
            placeholder="Enter Signed Company Policy Document"
            accept="image/png, image/jpeg"
            className="dashboard_input"
            onChange={(e) => setPolicyFile(e.target.files[0])}
          />
          {policyFile && (
            <img
              src={getPreviewObjectUrl(policyFile)}
              width={100}
              height={100}
            />
          )}
          {policyFile && (
            <div className="action_buttons">
              <button
                onClick={(e) => [e.preventDefault(), setPolicyFile(null)]}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="group files" style={{ justifyContent: "flex-start" }}>
          <label htmlFor="select_truck">Select a Truck</label>
          {trucks?.length > 0 && (
            <select
              name="select_truck"
              id="select_truck"
              onChange={(e) => setTruckNumber(e.target.value)}
              value={truckNumber}
              className="dashboard_input"
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
          {loading ? "Loading..." : (search ? "Update" : "Add Driver")}
        </button>
      </form>
    </div>
  );
}
