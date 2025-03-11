import React, { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import "../components/Login/Login.css"; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <div className="main-cont">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="form-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="form-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;