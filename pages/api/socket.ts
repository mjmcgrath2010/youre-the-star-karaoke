import { Server } from "socket.io";
import redis from "../../lib/redis";
const SocketHandler = (_: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("socket connection");
      socket.on("new-signup", async (msg) => {
        await redis.hset("signup", msg.id, JSON.stringify(msg));
        socket.broadcast.emit("signup", msg);
      });

      socket.on("song-complete", async (msg) => {
        await redis.hdel("signup", msg.id);
        socket.broadcast.emit("song-complete", msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
