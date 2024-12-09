import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import axios from "axios";

const intialState = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: "",
};

const PlaceOrder = () => {
  const { cart, foodList } = useSelector((state) => state.FoodReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState(intialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
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

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];

    for (let food of foodList) {
      if (cart[food._id] > 0) {
        const itemInfo = food;
        itemInfo["quantity"] = cart[food._id];
        orderItems.push(itemInfo);
      }
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { sessionUrl } = res.data;
      window.location.replace(sessionUrl);
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
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={handleChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip Code"
            name="zipcode"
            value={data.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="place-order-right">
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
