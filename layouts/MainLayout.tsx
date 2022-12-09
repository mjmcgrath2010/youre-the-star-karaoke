import { Container, Box } from "@mui/material";
import React, { useEffect } from "react";
import useSWR from "swr";
import TopNav from "../components/TopNav";
import { selectSongsLoaded, setSongs } from "../features/songs/songsSlice";
import { setUserId } from "../features/user/userSlice";
import useIdentity from "../hooks/useIdentity";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const songsLoaded = useAppSelector(selectSongsLoaded);
  const userId = useIdentity();

  const { data } = useSWR(
    "/api/songs",
    () => {
      return fetch("/api/songs").then((res) => res.json());
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    if (data && !songsLoaded) {
      dispatch(setSongs(data));
    }
  }, [songsLoaded, data, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]);
  return (
    <Box>
      <TopNav />
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: "16px",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
