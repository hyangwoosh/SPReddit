import React from "react";

import { CircularProgress, Box } from "@mui/material";

export const Spinner = () => (
  <Box style={{ padding: "10px 0px" }}>
    <CircularProgress size={30} style={{ color: "var(--red)" }} />
  </Box>
);
