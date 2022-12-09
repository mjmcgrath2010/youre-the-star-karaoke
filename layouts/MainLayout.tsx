import { Container, Box } from "@mui/material";
import React, { useEffect } from "react";
import TopNav from "../components/TopNav";
import { setUserId } from "../features/user/userSlice";
import useIdentity from "../hooks/useIdentity";
import { useAppDispatch } from "../hooks/useRedux";

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const userId = useIdentity();

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
