import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import PlaceOrder from "../pages/PlaceOrder";
import PageNotFound from "./PageNotFound";
import Verfiy from "../pages/Verify";
import MyOrders from "../pages/MyOrders";
import Auth from "./Auth";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cart"
        element={
          <Auth>
            <Cart />
          </Auth>
        }
      />
      <Route
        path="/order"
        element={
          <Auth>
            <PlaceOrder />
          </Auth>
        }
      />
      <Route
        path="/verify"
        element={
          <Auth>
            <Verfiy />
          </Auth>
        }
      />
      <Route
        path="/myorders"
        element={
          <Auth>
            <MyOrders />
          </Auth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRouter;
