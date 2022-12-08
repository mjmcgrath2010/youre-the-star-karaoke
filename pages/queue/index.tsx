import { useEffect, useCallback, useState } from "react";
import io, { Socket } from "socket.io-client";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import useSongQueue from "../../hooks/useSongQueue";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import useSocket from "../../hooks/useSocket";

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

function GridNoResults() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Typography variant="h4" align="center">
        Nothing in the queue yet! 💤
      </Typography>
      <Typography variant="h6" align="center">
        Add a song from the song list to get singing! 🎤
      </Typography>
    </Box>
  );
}

const CompleteButton = ({ id }: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    const socket = io();
    return socket;
  };

  useEffect(() => {
    if (!socket) {
      socketInitializer().then((socket) => {
        setSocket(socket);
      });
    }
  }, [socket]);

  const handleComplete = () => {
    socket?.emit("song-complete", id);
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleComplete}>
      Done
    </Button>
  );
};

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "title",
    headerName: "Song Title",
    flex: 1,
  },
  {
    field: "artist",
    headerName: "Artist",
    flex: 1,
  },
  {
    field: "diskNumber",
    headerName: "Disk Number",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Submitted At",
    flex: 1,
  },

  {
    field: "setCompleted",
    headerName: "",
    sortable: false,
    flex: 1,
    renderCell: (params: any) => {
      return <CompleteButton id={params.id} />;
    },
  },
];

const SignupPage = () => {
  const [queue, updateQueue] = useState<any[]>([]);
  const socket = useSocket();

  const { data, refresh } = useSongQueue();

  const setupListers = useCallback(
    (socket: Socket) => {
      socket.on("new-signup", (msg: any) => {
        updateQueue(
          [...queue, msg].map(
            ({ title, name, artist, diskNumber, id, createdAt }: any = {}) => {
              return {
                title,
                name,
                artist,
                diskNumber,
                id,
                createdAt: dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
              };
            }
          )
        );
      });
    },
    [queue]
  );

  useEffect(() => {
    if (socket) {
      setupListers(socket);
    }
  }, [setupListers, socket]);

  const rows = [...(data || []), ...queue];

  const handleRowClick = ({ id }: any) => {
    socket?.emit("song-complete", id);
    refresh();
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          gap: "16px",
        }}
      >
        <Typography variant="h4">Queue</Typography>
        <Box sx={{ height: "80vh", width: "100%" }}>
          <DataGrid
            components={{
              Toolbar: QuickSearchToolbar,
              NoRowsOverlay: GridNoResults,
            }}
            pagination
            columns={columns}
            onRowClick={handleRowClick}
            rows={rows}
          />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default SignupPage;
