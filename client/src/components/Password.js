import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";

const Password = ({
  profileImage,
  password,
  email,
  handleChange,
  handlePasswordSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async () => {
    const toastId = toast.loading("Sending email...");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/forgotPassword",
        {
          email,
        }
      );
      toast.success(response.data.message);
      navigate("/recovery");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error is ", error);
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <div className={styles.glass}>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          <h4 className="text-3xl font-medium text-[#7edbe9]">
            Enter Password!
          </h4>
        </div>
        <form className="py-1 w-full" onSubmit={handlePasswordSubmit}>
          <div className="flex justify-center py-2">
            <img
              src={profileImage}
              className={styles.profile_img}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-full flex items-center">
              <input
                className={styles.textBox}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 p-2"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <button className={styles.btn} type="submit">
              Sign in
            </button>
          </div>

          <div className="text-center py-4">
            <span className="text-black font-medium">
              Forgot Password ?{" "}
              <Link className="text-[#06BEE1]" onClick={handleForgotPassword}>
                Recover Password
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
