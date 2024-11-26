import React, { useEffect } from 'react';
import { setAuthToken } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;