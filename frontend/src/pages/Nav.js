import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../component/context/LoginContext';
import '../style/Nav.css';

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useContext(LoginContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDashboardClick = () => {
    if (role === 'employee') {
      alert('Unauthorized access');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <div className='navbar'>
        <div className='nav-title'>
          <h3>Employee-Management-System</h3>
        </div>
        <div className={`nav-items ${isSidebarOpen ? 'active' : ''}`}>
          <Link to={`/logout`}><div>Logout</div></Link>
          <div onClick={handleDashboardClick}>Dashboard</div>
        </div>
        <div className='menu-toggle' onClick={toggleSidebar}>
          &#9776;
        </div>
      </div>
    </div>
  );
};

export default Nav;