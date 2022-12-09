import React, { useState } from "react";
import Head from "next/head";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignupModal from "../components/SignupModal";
import MainLayout from "../layouts/MainLayout";
import { IconButton } from "@mui/material";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useAppSelector } from "../hooks/useRedux";
import { selectSongs, selectSongsLoaded } from "../features/songs/songsSlice";
import useRecentSongs from "../hooks/useRecentSongs";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus":
      {
        outline: "none",
      },
    "& .MuiDataGrid-cell:hover": {
      cursor: "pointer",
    },
  },
});

function QuickSearchToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter
        placeholder="Search by song title or artist..."
        sx={{ width: "350px" }}
      />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function Home() {
  const classes = useStyles();
  const [song, setSong] = useState<Record<string, string> | undefined>();
  const { recentSongs } = useRecentSongs();
  const songs = useAppSelector(selectSongs);
  const songsLoaded = useAppSelector(selectSongsLoaded);

  console.table(recentSongs);

  const columns = [
    {
      field: "title",
      headerName: "Song Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "artist",
      headerName: "Artist",
      flex: 1,
    },
    {
      field: "diskNumber",
      headerName: "Disk Number",
      flex: 0.5,
      minWidth: 40,
      hide: global.innerWidth < 600,
    },
    {
      field: "addToQueue",
      headerName: "",
      sortable: false,
      renderCell: ({ row }: any) => {
        const handleClick = () => {
          setSong(row);
        };
        return (
          <IconButton onClick={handleClick}>
            <AddCircleOutlineRounded />
          </IconButton>
        );
      },
      flex: 0.5,
      maxWidth: 60,
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Garage Karaoke</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          gap: "16px",
        }}
      >
        <Typography variant="h4">Song List</Typography>
        {song && <SignupModal {...song} onClose={setSong} />}
        <Box
          sx={{
            height: "80vh",
            width: "100%",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <DataGrid
            className={classes.root}
            loading={!songsLoaded}
            getRowId={(row) => row._id}
            pagination
            onRowClick={({ row, id }) => {
              setSong({ ...row, id });
            }}
            columns={columns}
            rows={songs || []}
            components={{ Toolbar: QuickSearchToolbar }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}
