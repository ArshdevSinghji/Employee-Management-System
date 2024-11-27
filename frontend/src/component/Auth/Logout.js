import React, { useContext, useEffect } from 'react';
import { setAuthToken } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/LoginContext";

const Logout = () => {
  const navigate = useNavigate();

  const { setLoggedIn } = useContext(LoginContext);


  useEffect(() => {
    localStorage.removeItem('token');
    setLoggedIn("");
    setAuthToken(null);
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;