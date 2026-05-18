// import { useEffect, useRef, useState } from "react";
// import { socket } from "../hooks/useSocket";
// import { useBoardStore } from "../store/boardStore";

// const roomId = "room-1";

// const Whiteboard = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const [drawing, setDrawing] = useState(false);

//   const { color, size } = useBoardStore();

//   useEffect(() => {
//     socket.emit("join-room", roomId);

//     socket.on("draw", drawFromSocket);

//     socket.on("load-board", (strokes) => {
//       strokes.forEach(drawLine);
//     });

//     socket.on("clear-board", clearCanvas);

//     return () => {
//       socket.off("draw");
//     };
//   }, []);

//   const getContext = () => {
//     return canvasRef.current?.getContext("2d");
//   };

//   const drawLine = (data: any) => {
//     const ctx = getContext();

//     if (!ctx) return;

//     ctx.strokeStyle = data.color;
//     ctx.lineWidth = data.size;

//     ctx.beginPath();
//     ctx.moveTo(data.prevX, data.prevY);
//     ctx.lineTo(data.x, data.y);
//     ctx.stroke();
//   };

//   const drawFromSocket = (data: any) => {
//     drawLine(data);
//   };

//   const startDrawing = () => {
//     setDrawing(true);
//   };

//   const stopDrawing = () => {
//     setDrawing(false);
//   };

//   const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!drawing) return;

//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const prevX = x - e.movementX;
//     const prevY = y - e.movementY;

//     const data = {
//       x,
//       y,
//       prevX,
//       prevY,
//       color,
//       size,
//     };

//     drawLine(data);

//     socket.emit("draw", {
//       roomId,
//       data,
//     });
//   };

//   const clearCanvas = () => {
//     const ctx = getContext();

//     if (!ctx || !canvasRef.current) return;

//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   return (
//     <canvas
//       ref={canvasRef}
//       width={window.innerWidth}
//       height={window.innerHeight}
//       style={{
//         border: "1px solid #ccc",
//       }}
//       onMouseDown={startDrawing}
//       onMouseUp={stopDrawing}
//       onMouseLeave={stopDrawing}
//       onMouseMove={handleMove}
//     />
//   );
// };

// export default Whiteboard;

import { useEffect, useRef, useState } from "react";

import throttle from "lodash.throttle";

import { socket } from "../hooks/useSocket";

import type { BoardElement, Stroke } from "../types/drawing";

import { useBoardStore } from "../store/boardStore";
// import { usePresenceStore } from "../store/presenceStore";

import { redrawCanvas } from "../canvas/redrawCanvas";

const roomId = "room-1";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { elements, addElement, removeElement, color, size, tool } =
    useBoardStore();

  // const updateCursor = usePresenceStore((state) => state.updateCursor);

  const [drawing, setDrawing] = useState(false);

  const [currentElement, setCurrentElement] = useState<BoardElement | null>(
    null,
  );

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("draw", (element) => {
      addElement(element);
    });

    socket.on("undo", (id) => {
      removeElement(id);
    });

    socket.on("redo", (element) => {
      addElement(element);
    });

    // socket.on("cursor-move", (cursor) => {
    //   updateCursor(cursor);
    // });

    return () => {
      socket.off("draw");
      socket.off("undo");
      socket.off("redo");
      socket.off("cursor-move");
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    redrawCanvas(ctx, canvas, elements);

    if (currentElement) {
      redrawCanvas(ctx, canvas, [...elements, currentElement]);
    }
  }, [elements, currentElement]);

  const getPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);

    const point = getPoint(e);

    if (tool === "pencil") {
      setCurrentElement({
        id: crypto.randomUUID(),
        type: "stroke",
        points: [point],
        color,
        size,
      });
    }
  };

  // const emitCursor = throttle((x: number, y: number) => {
  //   socket.emit("cursor-move", {
  //     roomId,
  //     x,
  //     y,
  //     color,
  //   });
  // }, 20);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getPoint(e);

    // emitCursor(point.x, point.y);

    if (!drawing || !currentElement) return;

    if (currentElement.type === "stroke") {
      setCurrentElement({
        ...currentElement,
        points: [...currentElement.points, point],
      } as Stroke);
    }
  };

  const handleMouseUp = () => {
    if (!currentElement) return;

    addElement(currentElement);

    socket.emit("draw", {
      roomId,
      element: currentElement,
    });

    setCurrentElement(null);

    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        background: "#f8f8f8",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Whiteboard;
