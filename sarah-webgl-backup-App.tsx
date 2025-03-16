import React from "react";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        position: "relative",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <header
        className="App-header"
        style={{
          background: "rgba(0,0,0,0.5)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "calc(10px + 2vmin)",
          color: "white",
        }}
      >
        <h1>赵春晖</h1>
        <p>前端开发工程师</p>
        <p style={{ fontSize: "1rem" }}>专注于React技术栈</p>
      </header>
    </div>
  );
}

export default App;
