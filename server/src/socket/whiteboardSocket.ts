import { Server, Socket } from "socket.io";

import { removeElement, saveElement, clearBoard } from "../rooms/roomManager";

export const registerWhiteboardSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("connected", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("draw", ({ roomId, element }) => {
      saveElement(roomId, element);

      socket.to(roomId).emit("draw", element);
    });

    socket.on("undo", ({ roomId, elementId }) => {
      removeElement(roomId, elementId);

      socket.to(roomId).emit("undo", elementId);
    });

    socket.on("redo", ({ roomId, element }) => {
      saveElement(roomId, element);

      socket.to(roomId).emit("redo", element);
    });

    socket.on("clear-board", (roomId: string) => {
      clearBoard(roomId);
      socket.to(roomId).emit("clear-board");
    });

    // socket.on("cursor-move", (data) => {
    //   socket.to(data.roomId).emit("cursor-move", {
    //     userId: socket.id,
    //     ...data,
    //   });
    // });

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });
  });
};
