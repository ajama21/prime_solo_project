import React, { useState } from "react";
import "./Dashboard.css";
import TopNav from "../Common/TopNav";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Dashboard() {
  const history = useHistory();
  const { search } = useLocation();
  const [deleteTruck, setDeleteTruck] = useState();

  const dispatch = useDispatch();

  const trucks = useSelector((store) => store.trucks);
  const drivers = useSelector((store) => store.drivers);

  useEffect(() => {
    dispatch({ type: "FETCH_TRUCKS" });
    dispatch({ type: "FETCH_DRIVERS" });
  }, [dispatch]);

  // if(!params.view) return null;

  return (
    <div className="dashboard">
      <TopNav />
      <div className="table">
        <div className="tabs">
          <span
            onClick={() =>
              history.replace({
                pathname: "/dashboard",
                search: new URLSearchParams({ view: "drivers" }).toString(),
              })
            }
            className={
              search.split("=")[1] === "drivers" ? "activeTab" : "inactiveTab"
            }
          >
            Drivers
          </span>
          <span
            onClick={() =>
              history.replace({
                pathname: "/dashboard",
                search: new URLSearchParams({ view: "trucks" }).toString(),
              })
            }
            className={
              search.split("=")[1] === "trucks" ? "activeTab" : "inactiveTab"
            }
          >
            Trucks
          </span>
        </div>
        <table>
          <thead>
            <th>
              {search.split("=")[1] === "trucks" ? "Make" : "Driver Name"}
            </th>
            <th>
              {search.split("=")[1] === "trucks"
                ? "Truck Number"
                : "Truck Number"}
            </th>
            <th>Actions</th>
          </thead>
          <tbody>
            {search.split("=")[1] === "drivers" &&
              drivers.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.name}</td>
                  <td>{driver.truck_number}</td>
                  <td>
                    <button
                      onClick={() =>
                        history.push("/dashboard/driverpage/" + driver.id)
                      }
                      className="table_button_view"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this driver?"
                          )
                        ) {
                          dispatch({
                            type: "DELETE_DRIVER",
                            payload: driver?.id,
                          });
                        }
                      }}
                      className="table_button_delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {search.split("=")[1] === "trucks" &&
              trucks?.map((truck) => (
                <tr key={truck.id}>
                  <td>{truck.make}</td>
                  <td>{truck.truck_number}</td>
                  <td>
                    <button
                      className="table_button_view"
                      onClick={() =>
                        history.push("/dashboard/truckpage/" + truck.id)
                      }
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this truck?"
                          )
                        ) {
                          dispatch({
                            type: "DELETE_TRUCK",
                            payload: truck?.truck_number,
                          });
                        }
                      }}
                      className="table_button_delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
