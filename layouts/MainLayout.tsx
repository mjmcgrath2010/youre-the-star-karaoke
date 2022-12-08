import { Container, Box } from "@mui/material";
import React from "react";
import TopNav from "../components/TopNav";

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
