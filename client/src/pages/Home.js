import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return <div className="text-white">Hi {user?.username}</div>;
};

export default Home;
