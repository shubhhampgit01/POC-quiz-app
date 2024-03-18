import React, { useState } from "react";
import styles from "./styles.module.scss";

const Button = ({ children, onClick, type="back" }) => {
  return (
    <div
      className={type == "next" ? styles.button : styles.backButton}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
