import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Grid, TextField } from "@mui/material";
import { Card } from "./../../components";

export const PostCreateWidget = () => {
  const redirect = useNavigate();

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Avatar
        style={{
          width: "40px",
          height: "40px",
          marginRight: "10px",
          background: "var(--red)",
        }}
      >
        M
      </Avatar>
      <TextField
        type="text"
        placeholder="Create Post"
        onFocus={() => redirect("/posts/create")}
      />
    </Card>
  );
};
