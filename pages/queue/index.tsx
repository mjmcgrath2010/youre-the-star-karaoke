import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import Container from "../../components/Container";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

let socket: any;

export interface SignupPageProps {}

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 400,
  },
  {
    field: "title",
    headerName: "Song Title",
    minWidth: 400,
  },
  {
    field: "artist",
    headerName: "Artist",
    minWidth: 400,
  },
  {
    field: "diskNumber",
    headerName: "Disk Number",
    minWidth: 200,
  },
];

const SignupPage = () => {
  const [queue, updateQueue] = useState<any[]>([]);

  const setupListers = (socket: any) => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("new-signup", (msg: any) => {
      const newQueue = [msg].map(
        ({ title, name, artist, diskNumber, id }: any = {}) => {
          return {
            title,
            name,
            artist,
            diskNumber,
            id,
          };
        }
      );
      updateQueue(newQueue);
    });
  };

  useEffect(() => {
    if (!socket) {
      const socketInitializer = async () => {
        await fetch("/api/socket");
        socket = io();
        return socket;
      };
      socketInitializer().then((socket) => {
        setupListers(socket);
      });
    }
  }, []);

  return (
    <Container direction="column">
      <Typography variant="h3">Queue</Typography>
      <Container>
        {queue.length ? (
          <DataGrid pagination columns={columns} rows={queue} />
        ) : (
          <Typography variant="h6">No data</Typography>
        )}
      </Container>
    </Container>
  );
};

export default SignupPage;
