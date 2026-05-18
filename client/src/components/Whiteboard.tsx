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
import { useBoardStore } from "../store/boardStore";
import { Stroke } from "../types/drawing";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  const { color, size, strokes, addStroke } = useBoardStore();

  useEffect(() => {
    redrawCanvas();
  }, [strokes, currentStroke]);

  const getContext = () => {
    return canvasRef.current?.getContext("2d");
  };

  const drawStroke = (stroke: Stroke) => {
    const ctx = getContext();

    if (!ctx) return;

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = "round";

    const points = stroke.points;

    if (points.length < 2) return;

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();
  };

  const redrawCanvas = () => {
    const ctx = getContext();

    if (!ctx || !canvasRef.current) return;

    if (currentStroke) {
      drawStroke(currentStroke);
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    strokes.forEach(drawStroke);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();

    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setCurrentStroke({
      id: crypto.randomUUID(),
      points: [point],
      color,
      size,
    });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentStroke) return;

    const rect = canvasRef.current!.getBoundingClientRect();

    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setCurrentStroke({
      ...currentStroke,
      points: [...currentStroke.points, point],
    });
  };

  const stopDrawing = () => {
    if (!currentStroke) return;

    addStroke(currentStroke);

    setCurrentStroke(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        border: "1px solid #ccc",
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default Whiteboard;
