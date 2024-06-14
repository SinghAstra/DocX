import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Username.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      const passwordValidationResult = validatePassword(value);
      if (passwordValidationResult === true) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
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

  const validateEmail = () => {
    const { email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = () => {
    const { username } = formData;
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    if (!lengthRegex.test(password)) {
      return "Password must be at least 8 characters long";
    }
    if (!numberRegex.test(password)) {
      return "Password must contain at least one number";
    }
    if (!upperCaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!lowerCaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character";
    }
    return true;
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (!validateEmail()) {
      toast.error("Invalid email address");
      return false;
    }
    if (!validateUsername()) {
      toast.error(
        "Username can only contain letters, numbers, underscores, and dots"
      );
      return false;
    }
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== true) {
      toast.error(passwordValidationResult);
      return false;
    }
    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   const formDataToSend = new FormData();
    //   formDataToSend.append("username", formData.username);
    //   formDataToSend.append("email", formData.email);
    //   formDataToSend.append("password", formData.password);
    //   formDataToSend.append("confirmPassword", formData.confirmPassword);
    //   formDataToSend.append("profileImage", imageFile);
    //   console.log("Form submitted:", formData);
    //   toast.success("Form submitted successfully!");
    // }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );
      toast.success(response.data.message);
      toast.success(response.data.token);
      login(response.data.token);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log("Error while registering :", error);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className={`${styles.glass} p-2`}>
        <div className="flex flex-col items-center">
          <h4 className="text-3xl font-medium text-[#7edbe9]">Register</h4>
        </div>
        <form className="py-1" onSubmit={handleSubmit}>
          <div className="flex justify-center py-2">
            <label htmlFor="profile" className="cursor-pointer">
              <img
                src={imageUrl || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <input
              className={styles.textBox}
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className={styles.textBox}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
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
            {isPasswordValid && (
              <div className="relative w-full flex items-center">
                <input
                  className={styles.textBox}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 p-2"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            )}
            <button className={styles.btn} type="submit">
              Register
            </button>
          </div>

          <div className="text-center py-1">
            <span className="text-black font-medium">
              Already Member ?{" "}
              <Link className="text-[#06BEE1]" to="/">
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
