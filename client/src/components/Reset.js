import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import styles from "../styles/Username.module.css";

const Reset = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { email } = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const lengthRegex = /.{8,}/;
  const numberRegex = /\d/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const isPasswordValid = () => {
    const { password } = formData;
    return (
      lengthRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;
    if (!isPasswordValid()) {
      toast.error("Password does not meet all conditions");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/resetPassword",
          {
            email,
            newPassword: formData.password,
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className={`${styles.glass} flex flex-col justify-between`}>
        <div className="flex flex-col items-center">
          <div>
            <h4 className="text-4xl font-medium text-[#7edbe9]">
              Reset Password
            </h4>
            {!isPasswordValid() && (
              <div className="text-base text-white my-5 ">
                Password must
                <br />
                be at least 8 characters long:{" "}
                {lengthRegex.test(formData.password) ? (
                  <span className="text-green-400">&#10004;</span>
                ) : (
                  <span className="text-red-400">&#10006;</span>
                )}
                <br />
                contain at least one number:{" "}
                {numberRegex.test(formData.password) ? (
                  <span className="text-green-400">&#10004;</span>
                ) : (
                  <span className="text-red-400">&#10006;</span>
                )}
                <br />
                contain at least one uppercase letter:{" "}
                {upperCaseRegex.test(formData.password) ? (
                  <span className="text-green-400">&#10004;</span>
                ) : (
                  <span className="text-red-400">&#10006;</span>
                )}
                <br />
                contain at least one lowercase letter:{" "}
                {lowerCaseRegex.test(formData.password) ? (
                  <span className="text-green-400">&#10004;</span>
                ) : (
                  <span className="text-red-400">&#10006;</span>
                )}
                <br />
                contain at least one special character:{" "}
                {specialCharRegex.test(formData.password) ? (
                  <span className="text-green-400">&#10004;</span>
                ) : (
                  <span className="text-red-400">&#10006;</span>
                )}
              </div>
            )}
          </div>
        </div>
        <form className="py-1" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-full flex items-center">
              <input
                className={styles.textBox}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="password"
                value={formData.password}
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

            {isPasswordValid() && (
              <>
                <div className="relative w-full flex items-center">
                  <input
                    className={styles.textBox}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 p-2"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </>
            )}
            <button className={styles.btn} type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
