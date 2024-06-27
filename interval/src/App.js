import React, { useState } from "react";
import './App.css';
import Sidebar from "./component/sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(false);



  const toggleMenu = () => {
    setIsOpen(isOpen => !isOpen);
  }
  
  return (
    <div className="App">
      <ul className = "sidebarWrapper">
        <span onClick = {toggleMenu}>⭐</span>
      </ul>
      <ul className={isOpen ? "show-side" : "hide-side"} >
        <Sidebar/>
      </ul>

    </div>
  );
}

export default App;
