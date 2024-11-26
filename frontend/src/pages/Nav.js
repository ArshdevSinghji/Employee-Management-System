import React from 'react'
import '../style/Nav.css'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
      <div className='navbar'>
        <div className='nav-title'>
            <h3>Employee-Management-System</h3>
        </div>
        <div className='nav-items'>
            <Link to={`/logout`}><div>Logout</div></Link>
            <Link to={`/dashboard`}><div>Dashboard</div></Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
