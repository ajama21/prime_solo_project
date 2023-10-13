import React, { useState } from "react";
import "./DriverPage.css";
import { useParams } from "react-router-dom";
import TopNav from "../Common/TopNav";

export default function DriverPage() {
  const params = useParams();
  const [showPopUp, setShowPopUp] = useState("");
  
  
  return (
    <>
      <TopNav />
      <div className="driver_page">
        <div className="driver_info">
          <div className="driver_details">
            <img
              src="https://assets.website-files.com/5f70f0246e0318453837c2b9/645e490635327ca9b661bb47_becoming%20a%20truck%20driver.webp"
              alt=""
            />
            <h2>Name</h2>
            <span>Assinged to Truck #00</span>
          </div>
        </div>
        <div className="driver_documents">
          <div className="driver_documents_images">
            <span
              onClick={() =>
                setShowPopUp(
                  "https://formspal.com/data/LandingPageImages/Image/2/245/245856.JPEG"
                )
              }
            >
              Application
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  "https://m.media-amazon.com/images/I/61k+xMg3I7L.jpg"
                )
              }
            >
              Driver's License
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  "https://www.smart-trucking.com/wp-content/uploads/2020/08/dot-medical-card.webp"
                )
              }
            >
              DOT Card
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  'https://plumsail.com/docs/documents/v1.x/_images/signed-contract-docusign.png'
                )
              }
            >
              Drug and Alcohol Document
            </span>
            <span
              onClick={() =>
                setShowPopUp(
                  "https://help.signrequest.com/hc/article_attachments/360013605300/What_is_the_signing_log.jpg"
                )
              }
            >
              Signed Company Policy
            </span>
          </div>
        </div>
        {showPopUp.length > 0 && <ImagePopUP imageLink={showPopUp} close={()=> setShowPopUp('')} />}
      </div>
    </>
  );
}

function ImagePopUP({ imageLink, close }) {
  return (
    <div className="image_pop_up">
      <div className="pop_up_image">
        <div className="close_svg">
        <svg onClick={() => close()}
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
