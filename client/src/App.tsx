// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";

import Whiteboard from "./components/Whiteboard";
import Toolbar from "./components/Toolbar";
// import CursorLayer from "./components/CursorLayer";

// import { socket } from "./hooks/useSocket";

import "./App.css";

// const roomId = "room-1";

function App() {
  return (
    <>
      <div>
        <h2>A Real-Time Collaborative Whiteboard</h2>
        {/* <Toolbar onClear={handleClear} /> */}

        <Toolbar />

        {/* <CursorLayer /> */}

        <Whiteboard />
      </div>
    </>
  );
}

export default App;
