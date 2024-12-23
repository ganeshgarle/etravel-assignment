// src/components/Loader.tsx
import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader: React.FC = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
