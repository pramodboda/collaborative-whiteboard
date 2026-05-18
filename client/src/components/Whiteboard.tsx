import { useEffect, useRef, useState } from "react";
import { socket } from "../hooks/useSocket";
import { useBoardStore } from "../store/boardStore";

const roomId = "room-1";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [drawing, setDrawing] = useState(false);

  const { color, size } = useBoardStore();

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("draw", drawFromSocket);

    socket.on("load-board", (strokes) => {
      strokes.forEach(drawLine);
    });

    socket.on("clear-board", clearCanvas);

    return () => {
      socket.off("draw");
    };
  }, []);

  const getContext = () => {
    return canvasRef.current?.getContext("2d");
  };

  const drawLine = (data: any) => {
    const ctx = getContext();

    if (!ctx) return;

    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.size;

    ctx.beginPath();
    ctx.moveTo(data.prevX, data.prevY);
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  };

  const drawFromSocket = (data: any) => {
    drawLine(data);
  };

  const startDrawing = () => {
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prevX = x - e.movementX;
    const prevY = y - e.movementY;

    const data = {
      x,
      y,
      prevX,
      prevY,
      color,
      size,
    };

    drawLine(data);

    socket.emit("draw", {
      roomId,
      data,
    });
  };

  const clearCanvas = () => {
    const ctx = getContext();

    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onMouseMove={handleMove}
    />
  );
};

export default Whiteboard;
