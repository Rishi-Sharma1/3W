import { useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  loginUser,
  registerUser,
} from "../services/authService";



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const register = async (data) => {
    const res = await registerUser(data);

    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};