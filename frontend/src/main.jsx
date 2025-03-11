import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reference from "./pages/Reference";
import AuthProvider from "./components/AuthProvider";
import Login from "./pages/Login";
import Register from "./components/Register/Register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="reference" element={<Reference />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> {/* Fixed: Added closing bracket */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);