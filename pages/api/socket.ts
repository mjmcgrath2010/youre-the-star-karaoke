import { Server } from "socket.io";
import redis from "../../lib/redis";
const SocketHandler = (_: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
      path: "/socket.io/",
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("new-signup", async (msg) => {
        await redis.hset(
          "signup",
          `${msg.userId}-${msg.id}`,
          JSON.stringify(msg)
        );
        await redis.hincrby(msg.userId, msg.id, 1);
        socket.broadcast.emit("signup", msg);
      });

      socket.on("song-complete", async (msg) => {
        await redis.hdel("signup", `${msg.userId}-${msg.id}`);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default SocketHandler;
