import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import { Box, Button, Grid } from "@mui/material";
import {
  Card,
  PostCard,
  Spinner,
  VoteBar,
  WidgetContainer,
} from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getPostByKey, getPosts } from "../../../store";
import { useNavigate, useParams } from "react-router-dom";

export const PostDetail = () => {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { post, isLoading } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (id) dispatch(getPostByKey(id));
  }, [dispatch, id]);

  return (
    <Card style={{ marginBottom: "10px" }} isLoading={isLoading}>
      <Box style={{ fontSize: "10px", fontWeight: 500, marginBottom: "5px" }}>
        {post?.creator}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <h1>{post?.title || "Post"}</h1>
        </Box>
        <Box>
          <span>{dayjs(post?.created_at).format("DD.MM")}</span>
        </Box>
      </Box>
      <Box style={{ padding: "15px 0px" }}>
        <p>{post?.content || "..."}</p>
      </Box>
      <Box>
        <VoteBar />
      </Box>
      <Box style={{ marginTop: "10px" }}>
        <Button
          variant="outlined"
          onClick={() => redirect(`/posts/${id}/edit`)}
        >
          Edit
        </Button>
      </Box>
    </Card>
  );
};
