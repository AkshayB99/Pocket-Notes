import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Headers from "./components/Header";
import Home from "./components/Home";
import Elements from "./components/Elements";

function App() {
  const [showHeaders, setShowHeaders] = useState(false);
  console.log(showHeaders);
  return (
    <>
      <div className="main-container">
      <div className={showHeaders ? "left-container600" : "left-container"}>
          <Headers setShowHeaders={setShowHeaders}  />
        </div>
        <div className={showHeaders ? "right-container600" : "right-container"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<Elements setShowHeaders={setShowHeaders} />} /> 
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
