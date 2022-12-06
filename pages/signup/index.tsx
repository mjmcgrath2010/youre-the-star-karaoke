import { useEffect, useState } from "react";
import io from "socket.io-client";
import Container from "../../components/Container";
import Heading from "../../components/Heading";

let socket: any;

export interface SignupPageProps {}

const SignupPage = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-input", (msg: string) => {
        setInput(msg);
      });
    };
    socketInitializer();
  }, []);

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <Container>
      <Heading>Sign up</Heading>

      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </Container>
  );
};

export default SignupPage;
