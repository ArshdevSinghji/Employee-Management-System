import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request if logged in
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};