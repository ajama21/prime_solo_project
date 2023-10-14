import React from 'react'
import './ViewTruck.css'
import TopNav from '../Common/TopNav'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewTruck() {
  const params = useParams();
  const dispatch = useDispatch();
  const truckdetails = useSelector((store) => store.truckdetails);
  console.log(truckdetails);

  useEffect(() => {
    dispatch({ type: "FETCH_TRUCK_DETAILS", payload: params.id});
  }, [dispatch]);

  return (
    <div className='truck_page'>
        <TopNav />
        <div className='truck_info'>
            <img src={truckdetails?.image_link} alt="" />
            <span>Make {truckdetails?.make}</span>
            <span>Year {truckdetails?.year}</span>
            <span>Model {truckdetails?.model}</span>
            <span>Truck Number {truckdetails?.truck_number}</span>
            <span>Assigne to: {truckdetails?.name} </span>
        </div>
    </div>
  )
}
