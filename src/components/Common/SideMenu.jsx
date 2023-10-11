import { func } from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom';

export default function SideMenu({ close }) {
  return (
    <div className='sideMenu' onClick={(e) => e.target === e.currentTarget ? close() : null}>
      <div className='sideMenuOptions'>
        <Option text='Dashboard' to='/dashboard'/>
        <Option text='Add New Driver' to='/dashboard/onboarding'/>
        <Option text='View All Drivers' to='/dashboard'/>
        <Option text='Add New Truck' to='/dashboard/newtruck'/>
        <Option text='View All Trucks' to='/dashboard'/>
        <button>Sign Out</button>
      </div>
    </div>
  )
}

function Option({ text,to }){
  return (
    <Link to={to}>{text}</Link>
  )
}