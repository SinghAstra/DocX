import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import profile from "../assets/avatar_2.jpeg";
import styles from "../styles/Username.module.css";

const Username = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "email@gmail.com",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Implement Form validation
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
      <div className={`${styles.glass} py-2`}>
        <div className="flex flex-col items-center">
          <h4 className="text-5xl font-bold">Profile</h4>
          <span className="py-1 text-base w-2/3 text-center text-gray-500">
            @Username123
          </span>
        </div>
        <form className="py-1 " onSubmit={handleSubmit}>
          <div className="flex justify-center py-2">
            <img src={profile} className={styles.profile_img} alt="avatar" />
          </div>

          <div className="flex flex-col items-center gap-2 ">
            <div className="flex gap-2">
              <input
                className={styles.textBox}
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                className={styles.textBox}
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <input
                className={styles.textBox}
                type="number"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
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
            </div>
            <input
              className={styles.textBox}
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <button className={styles.btn} type="submit">
              Update
            </button>
          </div>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Come back Later ?{" "}
              <Link className="text-red-500" to="/register">
                Log Out
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Username;
