import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonGroup, Grid, Box } from "@mui/material";
import { Card } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateApp } from "../../store";

import {
  Whatshot as WhatshotIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  FormatListBulleted as FormatListBulletedIcon,
  GridView as GridViewIcon,
} from "@mui/icons-material";

export const PostLayoutIconButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { postLayout } = useAppSelector((state) => state.app);

  const isGrid = postLayout === "grid";

  const handleLayoutToggle = (e: React.MouseEvent) => {
    e?.preventDefault();

    const postLayout = isGrid ? "list" : "grid";

    dispatch(updateApp({ postLayout }));
  };

  return (
    <Button
      variant="outlined"
      startIcon={isGrid ? <GridViewIcon /> : <FormatListBulletedIcon />}
      style={{ color: "var(--gray-light)", textTransform: "capitalize" }}
      onClick={handleLayoutToggle}
    >
      {postLayout}
    </Button>
  );
};

export const PostToolbar = () => {
  const redirect = useNavigate();

  return (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="outlined"
          startIcon={<FormatListBulletedIcon />}
          style={{
            textTransform: "unset",
            color: "var(--blue-light)",
            marginRight: "5px",
          }}
          onClick={() => redirect("/posts")}
        >
          All
        </Button>
        <Button
          variant="outlined"
          startIcon={<EmojiEventsIcon />}
          style={{
            textTransform: "unset",
            color: "var(--green-light)",
            marginRight: "5px",
          }}
          onClick={() => redirect("/posts/top")}
        >
          Top
        </Button>
        <Button
          variant="outlined"
          startIcon={<WhatshotIcon />}
          style={{
            textTransform: "unset",
            color: "var(--pink-light)",
            marginRight: "5px",
          }}
          onClick={() => redirect("/posts/hot")}
        >
          Hot
        </Button>
      </Box>
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <PostLayoutIconButton />
      </Box>
    </Card>
  );
};
