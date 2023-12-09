// AuthContext.js

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState("");

  return (
    <AuthContext.Provider value={{ login, setLogin, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
