const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const MESSAGES = {
  send: "send_msg",
  receive: "msg_receive",
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("client joined!");
  socket.on("send_msg", (msg) => {
    console.log("[MSG]:" + msg);
    io.emit("msg_received", msg);
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
