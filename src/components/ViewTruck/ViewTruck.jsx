import React from "react";
import "./ViewTruck.css";
import TopNav from "../Common/TopNav";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function ViewTruck() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const truckDetails = useSelector((store) => store.truckdetails);

  useEffect(() => {
    dispatch({ type: "FETCH_TRUCK_DETAILS", payload: params.id });
  }, [dispatch]);

  return (
    <div className="truck_page">
      <TopNav />
      <div className="truck_info">
        <img
          src={
            truckDetails?.truck_image_link
              ? truckDetails?.truck_image_link
              : "https://ftl.imgix.net/images/region/en-US/cabs/p4/126-bbc-48-xt.png?auto=format%2Ccompress&fm=jp2%2Cjpg&bg=d7d7d7"
          }
          alt=""
        />
        <span>Make: {truckDetails?.make}</span>
        <span>Year: {truckDetails?.year}</span>
        <span>Model: {truckDetails?.model}</span>
        <span>Truck Number: {truckDetails?.truck_number}</span>
        <span>Assigned to: {truckDetails?.name} </span>
        <button className="sign_up" onClick={() => history.push('/dashboard/newtruck?edit=' + params.id)}>
          Update Truck
        </button>
      </div>
    </div>
  );
}
