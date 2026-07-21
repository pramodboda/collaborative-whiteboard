// Toolbar.tsx
import { useState } from "react";
import { socket } from "../hooks/useSocket";
import { useBoardStore } from "../store/boardStore";


import liquidGlassStyle from "../theme/liquidGlassStyle"

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";




import PaletteIcon from "@mui/icons-material/Palette";
// import { IoSquareOutline } from "react-icons/io5";


// import { GoCircle } from "react-icons/go";
import { FaRegSquare } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { MdOutlineCleaningServices } from "react-icons/md";

const roomId = "room-1";

// function valuetext(value: number) {
//   return `${value}°C`;
// }

const Toolbar = () => {


  const {
    color,
    size,
    tool,
    setColor,
    setSize,
    setTool,
    undo,
    redo,
    clearBoard,
  } = useBoardStore();


  const [penToolsOpen, setPenToolsOpen] = useState(false)

  const handleUndo = () => {
    const removed = undo();

    if (!removed) return;

    socket.emit("undo", {
      roomId,
      elementId: removed.id,
    });
  };

  const handleRedo = () => {
    const restored = redo();

    if (!restored) return;

    socket.emit("redo", {
      roomId,
      element: restored,
    });
  };

  const handleClearBoard = () => {
    clearBoard();
    socket.emit("clear-board", roomId);
  };

  return (
    <div>

      {penToolsOpen ??
        <Box>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              overflow: "hidden",
              border: "2px solid #d1d5db",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                padding: 0,
                background: "none",
                cursor: "pointer",
              }}
            />
          </Box>
          <IconButton component="label">
            <PaletteIcon sx={{ color: color }} />

            <input
              hidden
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </IconButton>

          <Slider
            aria-label="Brush Size"
            value={size}
            valueLabelDisplay="auto"
            min={1}
            max={20}
            step={1}
            sx={{ width: 120 }}
            onChange={(_, value) => setSize(value as number)}
          />
        </Box>

      }



      <Box
        style={{
          display: "flex",
          gap: 10,
          padding: 10,
          position: "fixed",
          top: 10,
          left: 10,
          background: "white",
          zIndex: 1000,
          ...liquidGlassStyle
          
        }}
      >
        {/* 
        <button onClick={() => setTool("pencil")}>pencil</button> 

        <button onClick={() => setTool("rectangle")}>Rectangle</button>

        <button onClick={() => setTool("circle")}>Circle</button>

        <button onClick={() => setTool("line")}>Line</button> */}

        {/* <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        /> */}

        {/* <input
          type="range"
          min={1}
          max={20}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        /> */}


        {/* <button onClick={handleUndo}>Undo</button> */}
        {/* <button onClick={handleRedo}>Redo</button> */}
        {/* <button onClick={handleClearBoard}>Clear</button> */}

        {/* <div>{tool}</div> */}
        <ButtonGroup
        // sx={{
        //   '& .MuiButtonGroup-grouped': {
        //     minWidth: 40,
        //     width: 40,
        //     padding: 0,
        //   },
        // }}
        sx={{
          "& .MuiButtonGroup-grouped": {
            minWidth: 40,
            width: 40,
            p: 0,
      
            border: "none",
      
            // color: "rgba(0,0,0,0.8)",
      
            background: "transparent",
      
            "&:hover": {
              background: "rgba(255,255,255,0.15)",
            },
          },
        }}
        >
          <Button
            aria-label="pen"
            onClick={() => setTool("pen")}
            color="pramodMUI"
          >
            <LuPencil fontSize="1.15rem" />
          </Button>
          <Button aria-label="rectangle" onClick={() => setTool("rectangle")} color="pramodMUI">
            {/* <IoSquareOutline fontSize="1.2rem" /> */}
            <FaRegSquare fontSize="1.05rem" />
          </Button>

          <Button aria-label="circle" onClick={() => setTool("circle")} color="pramodMUI">
            {/* <GoCircle fontSize="1.1rem" /> */}
            <FaRegCircle fontSize="1rem" />
          </Button>

          <Button aria-label="line" onClick={() => setTool("line")} color="pramodMUI">

            <TfiLayoutLineSolid fontSize="1rem" />
          </Button>
        </ButtonGroup>
        <ButtonGroup sx={{
          '& .MuiButtonGroup-grouped': {
            minWidth: 40,
            width: 40,
            padding: 0,
          },
        }}>
          <Button aria-label="undo" onClick={handleUndo} color="pramodMUI">
            <LuUndo fontSize="1.2rem" />
          </Button>
          <Button aria-label="redo" onClick={handleRedo} color="pramodMUI">
            <LuRedo fontSize="1.2rem" />
          </Button>
        </ButtonGroup>
        <Button
          variant="outlined"
          color="error"
          aria-label="clear-board"
          onClick={handleClearBoard}
          // sx={{ minWidth: 40,
          //   width: 40,
          //   padding: 0,}}
        >
          <MdOutlineCleaningServices fontSize="1.2rem" />
        </Button>
      </Box>

    </div>
  );
};

export default Toolbar;
