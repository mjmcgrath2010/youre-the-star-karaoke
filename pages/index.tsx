import React, { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
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
import { Button } from "@mui/material";

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
  const [song, setSong] = useState<Record<string, string> | undefined>();
  const { data } = useSWR("/api/songs", () => {
    return fetch("/api/songs").then((res) => res.json());
  });

  const columns = [
    {
      field: "title",
      headerName: "Song Name",
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
      field: "addToQueue",
      headerName: "",
      sortable: false,
      renderCell: ({ row }: any) => {
        const handleClick = () => {
          setSong(row);
        };
        return (
          <Button color="primary" variant="outlined" onClick={handleClick}>
            Add to Queue
          </Button>
        );
      },
      flex: 0.5,
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
            loading={!data}
            getRowId={(row) => row._id}
            pagination
            onRowClick={({ row, id }) => {
              setSong({ ...row, id });
            }}
            columns={columns}
            rows={data || []}
            components={{ Toolbar: QuickSearchToolbar }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}
