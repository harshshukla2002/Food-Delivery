import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { token } = useSelector((state) => state.AuthReducer);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;
