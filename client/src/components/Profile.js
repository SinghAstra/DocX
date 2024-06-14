import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import profile from "../assets/avatar_2.jpeg";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Username.module.css";

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    mobileNumber: user.mobile || "",
    email: user.email,
    address: user.address || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const validateForm = () => {
    const { firstName, lastName, mobileNumber, email, address } = formData;
    const namePattern = /^[a-zA-Z]{2,}$/;
    if (firstName !== "" && !namePattern.test(firstName)) {
      toast.error("Invalid firstName");
      return false;
    }
    if (lastName !== "" && !namePattern.test(lastName)) {
      toast.error("Invalid lastName");
      return false;
    }
    const mobilePattern = /^[0-9]{10}$/;
    if (mobileNumber !== "" && !mobilePattern.test(mobileNumber)) {
      toast.error("Mobile Number should contain exactly 10 digits");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (address !== "" && address.length < 5) {
      toast.error("Please enter a valid address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName, mobile, address, profile } = formData;
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `http://localhost:5000/api/user/updateUser`,
          { email, firstName, lastName, mobile, address, profile },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser({
          ...user,
          email,
          firstName,
          lastName,
          mobile,
          address,
          profile,
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className={`${styles.glass} py-2`}>
        <div className="flex flex-col items-center">
          <h4 className="text-5xl font-medium text-[#92DCE5]">Profile</h4>
          <span className="py-1 text-base w-2/3 text-center text-[#FBFBFB]">
            @{formData.username}
          </span>
        </div>
        <form className="py-1 " onSubmit={handleSubmit}>
          <div className="flex justify-center py-2">
            <label htmlFor="profile" className="cursor-pointer">
              <img
                src={imageUrl || profile}
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

          <div className="flex flex-col items-center gap-2 ">
            <div className="flex gap-2">
              <input
                className={styles.textBox}
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="off"
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
        </form>

        <div className="text-center py-4">
          <span className="text-black">
            Come back Later ?{" "}
            <button className="text-[#06BEE1]" onClick={logout}>
              Log Out
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
