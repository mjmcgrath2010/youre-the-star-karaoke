import { Container } from "@mui/material";
import React from "react";

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Container maxWidth="xl">{children}</Container>;
};

export default MainLayout;
