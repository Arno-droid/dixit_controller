import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CircleBoxComponent from "./CircleBoxComponent";

function App() {
  return (
    <div className="flex items-center justify-center h-full">
      <CircleBoxComponent numberOfBoxes={12} timeset={30} />
    </div>
  );
}

export default App;
