import React, { useState } from "react";
import axios from "axios";

import "./styles.css";
import { assets } from "../../assests/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ADD_TOKEN } from "../../redux/Auth/actiontype";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("login");
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (
      currentState === "login" &&
      data.email === "admin@mail.co" &&
      data.password === "admin"
    ) {
      window.location.href = "https://deloffoodadmin.netlify.app/add";
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/${
            currentState === "login" ? "login" : "register"
          }`,
          data
        );
        dispatch({ type: ADD_TOKEN, payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        setShowLogin(false);
      } catch (error) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error(error.response.data.message);
          toast.error(error.response.data.message);
        }
        console.error(error);
      }
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState !== "login" && (
            <input
              type="text"
              placeholder="your name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            placeholder="your email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {currentState === "login" ? "Login" : "Create Account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy and policy</p>
        </div>
        {currentState === "login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrentState("sign-up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
