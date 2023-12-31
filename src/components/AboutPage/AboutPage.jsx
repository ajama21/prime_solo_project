import React from "react";
import TopNav from "../Common/TopNav";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div
      className="container about_page"
      style={{ backgroundImage: `url('https://tfltruck.com/wp-content/uploads/2021/02/2022-freightliner-eCascadia-driving.jpeg')` }}
    >
      <div>
      <div className="overlay"></div>
        <TopNav />
        <h1 className="mission">OUR MISSION</h1>
        <p className="statement">
          "FleetTracker is a robust fleet management solution for small
          companies. Effortlessly organize and optimize your trucking operation
          with streamlined document management and truck maintenance
          requirements. Enhance driver safety and manage compliance to propel
          your business forward on the road. "{" "}
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
