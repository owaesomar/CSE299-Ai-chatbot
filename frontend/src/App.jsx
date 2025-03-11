import React from "react";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="mesh" className="mesh">
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
