import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import { ADD_CART_ITEM } from "../../redux/Food/actionType";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart, foodList } = useSelector((state) => state.FoodReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = async (itemId) => {
    const item = { ...cart, [itemId]: cart[itemId] - 1 };
    dispatch({ type: ADD_CART_ITEM, payload: item });

    if (token) {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/cart/remove/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
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

  useEffect(() => {
    getTotalCartAmount();
  }, [cart]);

  return (
    <div>
      {getTotalCartAmount() === 0 && (
        <p className="empty-text">You have nothing in the cart, please add!!</p>
      )}
      {getTotalCartAmount() > 0 && (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {foodList?.map((item, index) => {
              if (cart[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/${item?.image}`}
                        alt=""
                      />
                      <p>{item?.name}</p>
                      <p>${item?.price}</p>
                      <p>{cart[item?._id]}</p>
                      <p>${item?.price * cart[item?._id]}</p>
                      <p
                        className="cross"
                        onClick={() => removeFromCart(item?._id)}
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
