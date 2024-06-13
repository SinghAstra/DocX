import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";

const Recovery = () => {
  const [formData, setFormData] = useState({ otp: "" });

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
            <h4 className="text-3xl font-bold">Recover Account!</h4>
            <span className="pt-3 text-xl text-center text-gray-500 ">
              Enter the 6 digit OTP
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

            <div className="text-center py-4">
              <span className="text-gray-500">
                Email Not Sent ?{" "}
                <Link className="text-red-500" to="/recovery">
                  Resend Email
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
