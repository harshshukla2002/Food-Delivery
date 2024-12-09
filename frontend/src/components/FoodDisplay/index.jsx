import React from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import FoodItem from "../FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useSelector((state) => state.FoodReducer);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((food, index) => {
          if (category === "All" || category === food.category) {
            return <FoodItem food={food} key={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
