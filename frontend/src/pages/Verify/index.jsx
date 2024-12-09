import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Verfiy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order/verify`,
        { success, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      if (res.data.success === true) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
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
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verfiy;
