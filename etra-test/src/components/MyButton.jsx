import React from "react";
import { Button } from "react-bootstrap";

const MyButton = ({ text, onClick, variant = "primary" }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {text}
    </Button>
  );
};

export default MyButton;
