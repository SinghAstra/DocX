import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  console.log("loading is ", loading);
  console.log("user is ", user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    }
    setLoading(false);
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await verifyToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
