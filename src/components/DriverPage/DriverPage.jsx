import React, { useState } from "react";
import "./DriverPage.css";
import { useParams } from "react-router-dom";
import TopNav from "../Common/TopNav";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import driverReducer from "../../redux/reducers/driver.reducer";

export default function DriverPage() {
  const params = useParams();
  const [showPopUp, setShowPopUp] = useState("");

  const dispatch = useDispatch();
  const driverDetails = useSelector((store) => store.driverdetails);
  console.log(driverDetails);

  useEffect(() => {
    dispatch({ type: "FETCH_DRIVER_DETAILS", payload: params.id });
  }, [dispatch]);

  return (
    <>
      <TopNav />
      <div className="driver_page">
        <div className="driver_info">
          <div className="driver_details">
            <img
              src={
                driverDetails?.image_link
                  ? driverDetails?.image_link
                  : "https://www.enverus.com/wp-content/uploads/2023/01/default-user-avatar.png"
              }
              alt=""
            />
            <h2>Name {driverDetails?.name}</h2>
            <span>Assinged to Truck {driverDetails?.truck_number}</span>
          </div>
        </div>
        <div className="driver_documents">
          <div className="driver_documents_images">
            <span onClick={() => setShowPopUp(driverDetails?.application_link)}>
              Application
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  driverDetails?.license_link
                )
              }
            >
              Driver's License
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  driverDetails?.dot_link
                )
              }
            >
              DOT Card
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  driverDetails?.drug_alcohol_link
                )
              }
            >
              Drug and Alcohol Document
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  driverDetails?.company_policy_link
                )
              }
            >
              Signed Company Policy
            </span>
          </div>
        </div>
        {showPopUp.length > 0 && (
          <ImagePopUP imageLink={showPopUp} close={() => setShowPopUp("")} />
        )}
      </div>
    </>
  );
}

function ImagePopUP({ imageLink, close }) {
  return (
    <div className="image_pop_up">
      <div className="pop_up_image">
        <div className="close_svg">
          <svg
            onClick={() => close()}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="close"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <img src={imageLink} alt="" />
      </div>
    </div>
  );
}
