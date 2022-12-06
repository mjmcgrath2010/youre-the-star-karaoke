import React from "react";
import styled from "styled-components";
import theme from "../../theme";

export interface HeadingProps {
  children: React.ReactNode | string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = styled.h1.attrs((props: HeadingProps) => ({
  as: props.as || "h1",
}))<HeadingProps>`
  font-size: ${(props) =>
    props.theme.fontSizes[props.theme.headings[props.as].fontSize]};
  font-weight: ${(props) =>
    props.theme.fontWeights[props.theme.headings[props.as].fontWeight]};
`;

export default Heading;
