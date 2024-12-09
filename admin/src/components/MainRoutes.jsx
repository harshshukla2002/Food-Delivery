import React from "react";
import { Routes, Route } from "react-router-dom";
import Add from "../pages/Add";
import List from "../pages/List";
import Orders from "../pages/Orders";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/add" element={<Add />} />
      <Route path="/list" element={<List />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default MainRoutes;
