import { useEffect, useState } from "react";
import io from "socket.io-client";
import Container from "../../components/Container";
import Typography from "@mui/material/Typography";

let socket: any;

export interface SignupPageProps {}

const SignupPage = () => {
  const [queue, updateQueue] = useState<any[]>([]);

  useEffect(() => {
    if (!socket) {
      const socketInitializer = async () => {
        await fetch("/api/socket");
        socket = io();
      };
      socketInitializer().then(() => {
        socket.on("connect", () => {
          console.log("connected");
        });

        socket.on("new-signup", (msg: any) => {
          updateQueue((prevState: any[]) => [...prevState, msg]);
        });
      });
      return () => {
        if (socket) {
          socket.close();
        }
      };
    }
  }, []);
  return (
    <Container direction="column">
      <Typography variant="h3">Queue</Typography>
      <Container>
        {queue.length ? (
          queue.map((item) => <div key={item.id}>{item.name}</div>)
        ) : (
          <Typography variant="subtitle1">Empty</Typography>
        )}
      </Container>
    </Container>
  );
};

export default SignupPage;
