import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Username.module.css";

const Recovery = () => {
  const [formData, setFormData] = useState({ otp: "" });
  const { handleForgotPassword } = useContext(AuthContext);
  const location = useLocation();
  if (!location.state) {
    return <Navigate to="/" />;
  }
  const { email } = location.state;
  console.log("email is ", email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { otp } = formData;

    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast.error("Invalid OTP");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { otp } = formData;
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/verifyOTP",
          {
            email,
            otp,
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
      <div className={styles.glass}>
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-medium text-[#7edbe9]">
              Recover Account!
            </h4>
            <span className="text-xl text-center text-white pt-10">
              Enter the OTP
              <br /> sent to your email Address
            </span>
          </div>
          <form className="py-1 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2">
              <input
                className={styles.textBox}
                type="text"
                placeholder="OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
              />
              <button className={styles.btn} type="submit">
                Verify OTP
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-black font-medium">
              Email Not Sent ?{" "}
              <button
                className="text-[#06BEE1]"
                onClick={() => handleForgotPassword(email)}
              >
                Resend Email
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
