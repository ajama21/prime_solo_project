import React from 'react'
import './ViewTruck.css'
import TopNav from '../Common/TopNav'

export default function ViewTruck() {
  return (
    <div className='truck_page'>
        <TopNav />
        <div className='truck_info'>
            <img src="https://ftl.imgix.net/images/region/en-US/cabs/p4/126-bbc-48-xt.png?auto=format%2Ccompress&fm=jp2%2Cjpg&bg=d7d7d7" alt="" />
            <span>Make</span>
            <span>Yeaer</span>
            <span>Model</span>
            <span>Truck Number</span>
            <span>Assigne to: </span>
        </div>
    </div>
  )
}
