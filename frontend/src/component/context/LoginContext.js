import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState("");
  const [role, setRole] = useState("");
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, role,setRole }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };