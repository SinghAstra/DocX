import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-white">Hi {user?.username}</h1>
      <Link
        to="/profile"
        className="bg-yellow-400 py-2 px-4 hover:bg-yellow-600 text-white"
      >
        Profile
      </Link>
    </div>
  );
};

export default Home;
