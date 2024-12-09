import React, { useState } from "react";
import axios from "axios";

import "./styles.css";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrdersList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/order/orderslist`
      );
      setOrders(res.data.orders);
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

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order/update`,
        { orderId, status }
      );
      console.log(res.data);
      getOrdersList();
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

  useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((food, index) => {
                    if (index === order.items.length - 1) {
                      return food.name + " x " + food.quantity;
                    } else {
                      return food.name + " x " + food.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}{" "}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(event) =>
                  updateStatus(order._id, event.target.value)
                }
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
