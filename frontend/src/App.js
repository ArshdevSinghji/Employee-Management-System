import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './component/Auth/Login';
import Registration from './component/Auth/Registration';
import Logout from './component/Auth/Logout';
import EmployeeList from './component/Dashboard/EmployeeList';
import Nav from './pages/Nav';
import Home from './pages/Home';
import Footer from './pages/Footer';

const App = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/' || location.pathname === '/register';

  return (
    <div>
      {!hideNavAndFooter && <Nav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<EmployeeList />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;