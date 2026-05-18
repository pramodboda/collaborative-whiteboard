import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { registerWhiteboardSocket } from "./socket/whiteboardSocket";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

registerWhiteboardSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
