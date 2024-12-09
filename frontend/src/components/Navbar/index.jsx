import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { assets } from "../../assests/assets/frontend_assets/assets";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TOKEN } from "../../redux/Auth/actiontype";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const location = useLocation();
  const { cart, foodList } = useSelector((state) => state.FoodReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (let item in cart) {
      if (cart[item] > 0) {
        let itemInfo = foodList.find((prod) => prod._id === item);
        totalAmount += itemInfo?.price * cart[item];
      }
    }

    return totalAmount;
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: ADD_TOKEN, payload: "" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          className={
            menu === "home" && location.pathname === "/" ? "active" : ""
          }
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={
            menu === "menu" && location.pathname === "/" ? "active" : ""
          }
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#app-download"
          className={
            menu === "mobile-app" && location.pathname === "/" ? "active" : ""
          }
          onClick={() => setMenu("mobile-app")}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          className={
            menu === "contact-us" && location.pathname === "/" ? "active" : ""
          }
          onClick={() => setMenu("contact-us")}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>

        {!token && <button onClick={() => setShowLogin(true)}>sign in</button>}
        {token && (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="" />
                <p onClick={() => logout()}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
