import React from "react";
import { Link } from "react-router-dom";

import { Avatar, Box, Button, Grid } from "@mui/material";
import { Logo } from "../../components";
import { SearchBar } from "./../../containers";

export const Header: React.FC = () => {
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "55px",
        background: "var(--black-3)",
        color: "var(--gray-light)",
        zIndex: "100",
      }}
    >
      <Grid
        container
        style={{
          width: "1140px",
          margin: "0 auto",
        }}
      >
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Logo />
        </Grid>
        <Grid item xs={8}>
          <SearchBar />
        </Grid>
        <Grid
          item
          xs={2}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Link to={`/users/${140}`}>
            <Avatar style={{ background: "var(--red)" }}>M</Avatar>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
