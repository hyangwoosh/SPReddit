import React from "react";
import { Box, Grid, GridProps } from "@mui/material";
import { WidgetContainer } from "./../../components";

interface CardProps extends GridProps {
  isLoading?: boolean;
}

export const Card: React.FC<CardProps> = ({ style, isLoading, children }) => (
  <Box
    style={{
      width: "100%",
      padding: "15px",
      margin: "0px auto",
      marginBottom: "10px",
      boxSizing: "border-box",
      border: "1px",
      borderRadius: "var(--radius-5)",
      background: "var(--black-3)",
      ...style,
    }}
  >
    <WidgetContainer isLoading={isLoading}>{children}</WidgetContainer>
  </Box>
);

Card.defaultProps = { isLoading: false };
