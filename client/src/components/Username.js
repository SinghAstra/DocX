import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";

const Username = ({ username, handleChange, handleUsernameSubmit }) => {
  return (
    <div className={styles.glass}>
      <div className="flex flex-col items-center">
        <h4 className="text-4xl font-medium text-[#7edbe9]">Welcome back!</h4>
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
            autoComplete="off"
          />
          <button className={styles.btn} type="submit">
            Let's Go
          </button>
        </div>
      </form>
      <div className="text-center py-4">
        <span className="text-black font-medium">
          Not a Member ?{" "}
          <Link className="text-[#06BEE1] font-medium" to="/register">
            Register Now
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Username;
