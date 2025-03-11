import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider"; // Ensure this path is correct
import "./Navbar.css";
import DropdownButton from "./DropdownButton"; // Import DropdownButton as a separate component

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (<>
  <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/reference">Reference</Link>
        </li>
      </ul>

      {/* Dropdown button for login/logout */}
    </nav>

    <DropdownButton auth={auth} />
  </>
    
  );
};

export default Navbar;
