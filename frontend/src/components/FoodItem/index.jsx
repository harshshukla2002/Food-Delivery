import React from "react";
import axios from "axios";

import "./styles.css";
import { assets } from "../../assests/assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CART_ITEM } from "../../redux/Food/actionType";

const FoodItem = ({ food }) => {
  const { cart } = useSelector((state) => state.FoodReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const addToCart = async (itemId) => {
    if (!cart[itemId]) {
      const item = { ...cart, [itemId]: 1 };
      dispatch({ type: ADD_CART_ITEM, payload: item });
    } else {
      const item = { ...cart, [itemId]: cart[itemId] + 1 };
      dispatch({ type: ADD_CART_ITEM, payload: item });
    }

    if (token) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/cart/add`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
      } catch (error) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error(error.response.data.message);
        }
        console.error(error);
      }
    }
  };

  const removeFromCart = (itemId) => {
    const item = { ...cart, [itemId]: cart[itemId] - 1 };
    dispatch({ type: ADD_CART_ITEM, payload: item });
  };

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={`${process.env.REACT_APP_API_URL}/images/${food.image}`}
          alt=""
        />
        {!cart[food._id] ? (
          <img
            className="add"
            onClick={() => addToCart(food._id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(food._id)}
            />
            <p>{cart[food._id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(food._id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{food.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{food.description}</p>
        <p className="food-item-price">${food.price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
