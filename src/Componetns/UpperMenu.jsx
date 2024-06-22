import React, { useState } from "react";
import { useTestMode } from "../context/TestModeContext";
function UpperMenu({ countDown }) {
  const {setTestMode} = useTestMode();
  const handleTestChange = (value)=>{
    setTestMode(value);
  }
  return (
    <div className="upper-menu">
      <div className="timer">
        <h3>{countDown}</h3>
      </div>
      <div className="test-mode">
        <select name="" id="test-mode" onChange={(e)=>handleTestChange(e.target.value)}>
          <option value="">Chose testMode</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>
      </div>
    </div>
  );
}

export default UpperMenu;
