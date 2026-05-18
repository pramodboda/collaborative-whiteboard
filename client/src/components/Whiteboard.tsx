// Whiteboard.tsx

import { useEffect, useRef, useState } from "react";

// import throttle from "lodash.throttle";

import { socket } from "../hooks/useSocket";

import type { BoardElement, Stroke } from "../types/drawing";

import { useBoardStore } from "../store/boardStore";
// import { usePresenceStore } from "../store/presenceStore";

import { redrawCanvas } from "../canvas/redrawCanvas";

const roomId = "room-1";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { elements, addElement, removeElement, clearBoard, color, size, tool } =
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

    socket.on("clear-board", () => {
      clearBoard();
    });

    return () => {
      socket.off("draw");
      socket.off("undo");
      socket.off("redo");
      // socket.off("cursor-move");
      socket.off("clear-board");
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
