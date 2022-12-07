import { useEffect, useCallback, useState } from "react";
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export interface SignupPageProps {}

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
  },
  {
    field: "title",
    headerName: "Song Title",
    minWidth: 200,
  },
  {
    field: "artist",
    headerName: "Artist",
    minWidth: 200,
  },
  {
    field: "diskNumber",
    headerName: "Disk Number",
    minWidth: 100,
  },
];

const SignupPage = () => {
  const [queue, updateQueue] = useState<any[]>([]);

  const setupListers = useCallback(
    (socket: any) => {
      socket.on("new-signup", (msg: any) => {
        updateQueue(
          [...queue, msg].map(
            ({ title, name, artist, diskNumber, id }: any = {}) => {
              return {
                title,
                name,
                artist,
                diskNumber,
                id,
              };
            }
          )
        );
        socket.off("new-signup");
      });
    },
    [queue]
  );

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      const socket = io();
      return socket;
    };

    socketInitializer().then((socket) => {
      setupListers(socket);
    });
  }, [setupListers]);

  return (
    <Box>
      <Typography variant="h3">Queue</Typography>
      <Box>
        {queue.length ? (
          <Box sx={{ height: "80vh", width: "100%" }}>
            <DataGrid pagination columns={columns} rows={queue} />
          </Box>
        ) : (
          <Typography variant="h6">No data</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SignupPage;
