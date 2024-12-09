import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import axios from "axios";
import { assets } from "../../assests/assets/frontend_assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.AuthReducer);

  const getUserOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/order/userorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.orders);
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

  console.log(data);

  useEffect(() => {
    getUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((food, index) => {
                  if (index === order.items.length - 1) {
                    return food.name + " x " + food.quantity;
                  } else {
                    return food.name + " x " + food.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>{" "}
              </p>
              <button onClick={() => getUserOrders()}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
