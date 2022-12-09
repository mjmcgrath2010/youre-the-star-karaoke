import { useEffect, useCallback, useState } from "react";
import io, { Socket } from "socket.io-client";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import useSongQueue from "../../hooks/useSongQueue";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import MainLayout from "../../layouts/MainLayout";
import useSocket from "../../hooks/useSocket";
import { useAppSelector } from "../../hooks/useRedux";
import { selectUserId } from "../../features/user/userSlice";

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

const CompleteButton = ({ song }: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userId = useAppSelector(selectUserId);

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
    socket?.emit("song-complete", { userId, ...song });
  };

  return (
    <IconButton color="primary" onClick={handleComplete}>
      <DeleteOutlineRounded />
    </IconButton>
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
    renderCell: ({ row }: any) => {
      return <CompleteButton song={row} />;
    },
    minWidth: 150,
  },
];

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus,  .MuiDataGrid-columnHeader:focus":
      {
        outline: "none",
      },
  },
});

const SignupPage = () => {
  const [queue, updateQueue] = useState<any[]>([]);
  const socket = useSocket();
  const classes = useStyles();

  const { data, refresh } = useSongQueue();

  const setupListers = useCallback(
    (socket: any) => {
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
            className={classes.root}
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
