import React from "react";
import { Grid } from "@mui/material";

import { RootWrapper, ContentWrapper } from "./../../components";
import { Header, Sidebar } from "./../../containers";

interface ViewProps {
  title?: string;
}

export const View: React.FC<ViewProps> = ({ title, children }) => (
  <RootWrapper>
    <Header />
    <ContentWrapper>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </ContentWrapper>
  </RootWrapper>
);
