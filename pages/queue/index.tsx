import { useEffect, useState } from "react";
import io from "socket.io-client";
import Container from "../../components/Container";
import Heading from "../../components/Heading";

let socket: any;

export interface SignupPageProps {}

const SignupPage = () => {
  const [queue, updateQueue] = useState<any[]>([]);

  useEffect(() => {
    if (!socket) {
      const socketInitializer = async () => {
        await fetch("/api/socket");
        socket = io();

        socket.on("connect", () => {
          console.log("connected");
        });

        socket.on("signup-added", (msg: any) => {
          console.log(msg);

          updateQueue((prevState: any[]) => [...prevState, msg]);
        });
      };
      socketInitializer();
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, []);
  return (
    <Container>
      <Heading>Queue</Heading>
      {queue.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </Container>
  );
};

export default SignupPage;
