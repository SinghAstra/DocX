import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";

const Password = () => {
  const [formData, setFormData] = useState({ password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const lengthRegex = /.{8,}/;
  const numberRegex = /\d/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const validateForm = () => {
    const { password } = formData;
    if (!lengthRegex.test(password)) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (!numberRegex.test(password)) {
      toast.error("Password must contain at least one number");
      return false;
    }
    if (!upperCaseRegex.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    if (!lowerCaseRegex.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return false;
    }
    if (!specialCharRegex.test(password)) {
      toast.error("Password must contain at least one special character");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      toast.success("Form submitted successfully!");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <Toaster />
      <div className={styles.glass}>
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-bold">Enter Password!</h4>
            <span className="pt-3 text-base text-gray-500">
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
            </span>
          </div>
          <form className="py-1" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-full flex items-center">
                <input
                  className={styles.textBox}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              <button className={styles.btn} type="submit">
                Sign in
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password ?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Password
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
