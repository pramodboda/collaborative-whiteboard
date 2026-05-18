import { Server, Socket } from "socket.io";
import { saveStroke, getBoardData, clearBoard } from "../rooms/roomManager";

export const registerWhiteboardSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);

      const boardData = getBoardData(roomId);

      socket.emit("load-board", boardData);
    });

    socket.on("draw", ({ roomId, data }) => {
      saveStroke(roomId, data);

      socket.to(roomId).emit("draw", data);
    });

    socket.on("undo", ({ roomId, strokeId }) => {
      socket.to(roomId).emit("undo", strokeId);
    });

    socket.on("redo", ({ roomId, stroke }) => {
      socket.to(roomId).emit("redo", stroke);
    });

    socket.on("clear-board", (roomId: string) => {
      clearBoard(roomId);

      io.to(roomId).emit("clear-board");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
