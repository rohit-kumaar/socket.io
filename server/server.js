import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const port = 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("Id", socket.id);
  socket.emit("welcome", "welcome to the server");
  socket.broadcast.emit("broadcast", `Broadcast msg id : ${socket.id}`);

  socket.on("msg", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("disconnect", `User is disconnected : ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Port is working in port : http://localhost:${port}`);
});
