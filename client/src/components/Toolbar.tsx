// import { useBoardStore } from "../store/boardStore";

// interface Props {
//   onClear: () => void;
// }

// const Toolbar = ({ onClear }: Props) => {
//   const { color, size, setColor, setSize } = useBoardStore();

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: 10,
//         padding: 10,
//       }}
//     >
//       <input
//         type="color"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//       />

//       <input
//         type="range"
//         min={1}
//         max={20}
//         value={size}
//         onChange={(e) => setSize(Number(e.target.value))}
//       />

//       <button onClick={onClear}>Clear</button>
//     </div>
//   );
// };

// export default Toolbar;

import { socket } from "../hooks/useSocket";
import { useBoardStore } from "../store/boardStore";

const roomId = "room-1";

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
  const handleClear = () => {
    clearBoard();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: 10,
        // position: "fixed",
        top: 10,
        left: 10,
        background: "white",
        zIndex: 1000,
      }}
    >
      <button onClick={() => setTool("pencil")}>Pencil</button>

      <button onClick={() => setTool("rectangle")}>Rectangle</button>

      <button onClick={() => setTool("circle")}>Circle</button>

      <button onClick={() => setTool("line")}>Line</button>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <input
        type="range"
        min={1}
        max={20}
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />

      <button onClick={handleUndo}>Undo</button>

      <button onClick={handleRedo}>Redo</button>
      <button onClick={handleClear}>Clear</button>

      <div>{tool}</div>
    </div>
  );
};

export default Toolbar;
