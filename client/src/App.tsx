// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";

import Hero from "./components/Hero";
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
        {/* <Toolbar onClear={handleClear} /> */}
        <Hero />
        <Toolbar />
        {/* <CursorLayer /> */}
        <Whiteboard />
      </div>
    </>
  );
}

export default App;
