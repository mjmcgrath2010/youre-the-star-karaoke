import { useEffect, useCallback, useState } from "react";
import io, { Socket } from "socket.io-client";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import useSongQueue from "../../hooks/useSongQueue";

export interface SignupPageProps {}

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        alignSelf: "flex-end",
        width: "100%",
        display: "flex",
        minWidth: 400,
      }}
    >
      <GridToolbarQuickFilter
        placeholder="Search by an up coming participant..."
        sx={{ width: "350px" }}
      />
    </Box>
  );
}

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
  const [socket, setSocket] = useState<Socket | null>(null);

  const { data, error } = useSongQueue();

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
      setSocket(socket);
      setupListers(socket);
    });
  }, [setupListers]);

  const rows = [...(data || []), ...queue];

  const handleRowClick = ({ id }: any) => {
    socket?.emit("song-complete", id);
  };

  return (
    <Box>
      <Typography variant="h3">Queue</Typography>
      <Box>
        {rows.length ? (
          <Box sx={{ height: "80vh", width: "100%" }}>
            <DataGrid
              components={{ Toolbar: QuickSearchToolbar }}
              pagination
              columns={columns}
              onRowClick={handleRowClick}
              rows={rows}
            />
          </Box>
        ) : (
          <Typography variant="h6">No data</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SignupPage;
