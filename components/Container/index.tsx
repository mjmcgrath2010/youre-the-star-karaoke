import React from "react";
import styled from "styled-components";

export interface ContainerProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
  padding?: number;
}

const StyledContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || 4}px;
  padding: ${(props) => props.padding || 24}px;
`;

const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container;
