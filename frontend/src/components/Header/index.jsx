import React from "react";
import "./styles.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order Your Favorite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your craving and elevate your dining experience,
          one delicious meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
