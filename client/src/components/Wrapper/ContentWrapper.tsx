import React from "react";
import { Box } from "@mui/material";

export const ContentWrapper: React.FC = ({ children }) => (
  <Box
    style={{
      position: "relative",
      top: 0,
      display: "flex",
      flexFlow: "column wrap",
      width: "100%",
      maxWidth: "1140px",
      margin: "0px auto",
      marginTop: "55px",
      padding: "15px 0px",
    }}
  >
    {children}
  </Box>
);
