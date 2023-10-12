import React, { useState } from "react";
import "./Dashboard.css";
import TopNav from "../Common/TopNav";
import { useHistory } from "react-router-dom"

export default function Dashboard() {

  const history = useHistory();
  const [activeTab, setActiveTab] = useState('drivers');

  const drivers = [
    {
      id: 0,
      name: "Joe",
      status: "Assigned",
    },
    {
      id: 1,
      name: "Liplan",
      status: "Unassigned",
    },
    {
      id: 2,
      name: "AJ",
      status: "Unassigned",
    }
  ];

  const trucks = [
    {
      id: 0,
      make: "Freightliner",
      truckNumber: 485,
    },
    {
      id: 1,
      make: "Volvo",
      truckNumber: 200,
    },
  ];

  return (
    <div className="dashboard">
      <TopNav />
      <div className="table">
        <div className="tabs">
          <span onClick={()=> setActiveTab('drivers')} className={activeTab === 'drivers' ? 'activeTab' : 'inactiveTab'}>Drivers</span>
          <span onClick={()=> setActiveTab('trucks')} className={activeTab === 'trucks' ? 'activeTab' : 'inactiveTab'}>Trucks</span>
        </div>
        <table>
          <thead>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {activeTab === 'drivers' && drivers.map((driver)=> (
              <tr>
                <td>{driver.name}</td>
                <td>{driver.status}</td>
                <td><button onClick={() => history.push('/dashboard/driverpage/' + driver.id )}>View</button> <button>Remove</button></td>
              </tr>
            ))}
             {activeTab === 'trucks' && trucks.map((truck)=> (
              <tr>
                <td>{truck.make}</td>
                <td>{truck.truckNumber}</td>
                <td><button onClick={() => history.push('/dashboard/truckpage/' + truck.id )}>View</button> <button>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
