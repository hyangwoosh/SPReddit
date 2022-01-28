import React, { useState } from "react";

import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { Grid, Box } from "@mui/material";

import { Card, VoteBar } from "./../../components";
import { IPost } from "../../interfaces";

interface PostCardProps extends IPost {}

export const PostCard: React.FC<PostCardProps> = ({
  post_id,
  title,
  content,
  creator,
  created_at,
}) => (
  <Card style={{ margin: "0px" }}>
    <Box style={{ fontSize: "10px", fontWeight: 500, marginBottom: "5px" }}>
      {creator}
    </Box>
    <Grid container>
      <Grid item xs={8} style={{ height: "25px", overflow: "hidden" }}>
        <Link to={`/posts/${post_id}`} style={{ color: "var(--gray-light)" }}>
          <h2>{title || `Post #${post_id}`}</h2>
        </Link>
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "14px",
        }}
      >
        <span>{dayjs(created_at).format("DD.MM")}</span>
      </Grid>
    </Grid>

    <Box style={{ padding: "10px 0px", height: "45px", overflow: "hidden" }}>
      <p>{content}</p>
    </Box>
    <Box style={{ marginTop: "5px" }}>
      <VoteBar />
    </Box>
  </Card>
);

PostCard.defaultProps = {
  title: "Post",
  content: "...",
};
