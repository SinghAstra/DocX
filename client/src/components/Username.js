import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";

const Username = ({ username, handleChange, handleUsernameSubmit }) => {
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className={styles.glass}>
        <div className="flex flex-col items-center">
          <h4 className="text-5xl font-bold">Hello Again!</h4>
          <span className="py-1 text-xl w-2/3 text-center text-gray-500">
            Explore More by connecting with us.
          </span>
        </div>
        <form className="py-1" onSubmit={handleUsernameSubmit}>
          <div className="flex justify-center py-2">
            <img src={avatar} className={styles.profile_img} alt="avatar" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <input
              className={styles.textBox}
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <button className={styles.btn} type="submit">
              Let's Go
            </button>
          </div>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Not a Member ?{" "}
              <Link className="text-red-500" to="/register">
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Username;
