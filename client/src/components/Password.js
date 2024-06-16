import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Username.module.css";

const Password = ({
  userInfo,
  password,
  handleChange,
  handlePasswordSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleForgotPassword } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.glass}>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          <h4 className="text-3xl font-medium text-[#7edbe9]">
            Enter Password!
          </h4>
          <span>@{userInfo.username}</span>
        </div>
        <form className="py-1 w-full" onSubmit={handlePasswordSubmit}>
          <div className="flex justify-center py-2">
            <img src={avatar} className={styles.profile_img} alt="avatar" />
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
              <button
                className="text-[#06BEE1]"
                onClick={() => {
                  handleForgotPassword(userInfo.email);
                  navigate("/recovery", {
                    state: {
                      email: userInfo.email,
                    },
                  });
                }}
              >
                Recover Password
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
