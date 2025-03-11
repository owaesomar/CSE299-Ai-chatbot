import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DropdownButton.css"; // Import styles

const DropdownButton = ({ auth }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container">
      <button onClick={() => setOpen(!open)} className="dropdown-button">
        👤
      </button>
      {open && (
        <div className="dropdown-menu">
          {!auth?.user ? (
            <Link to="/login" className="dropdown-item">Login</Link>
          ) : (
            <button onClick={auth.logout} className="dropdown-item">Logout</button>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
