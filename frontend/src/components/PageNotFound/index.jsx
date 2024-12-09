import React from "react";

import "./styles.css";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <p className="error-code">404</p>
      <p className="error-text">Oops.... this page not found</p>
    </div>
  );
};

export default PageNotFound;
