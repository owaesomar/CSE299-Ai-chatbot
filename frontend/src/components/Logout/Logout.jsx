import React from "react";
import axios from "axios";

const Logout = ({ setAuth }) => {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      // Remove tokens from localStorage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setAuth(false);

      alert("Logout successful!");
    } catch (error) {
      console.error("Logout failed", error.response.data);
      alert("Error: " + error.response.data.detail);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
