import React from "react";
import styles from "./Header.module.css"; // Import the CSS module

const Header = () => {
  return (
    <div className={styles.header}>
      {" "}
      {/* Use curly braces for dynamic class names */}
      <h1>Mental Health Bot</h1>
    </div>
  );
};

export default Header;
