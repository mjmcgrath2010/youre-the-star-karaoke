import { Server } from "socket.io";

const SocketHandler = (_: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("socket connection");
      socket.on("new-signup", (msg) => {
        socket.broadcast.emit("signup", msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
