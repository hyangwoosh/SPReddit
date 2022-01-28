import React, { useEffect } from "react";

import { Box, Grid } from "@mui/material";
import { PostCard, PostContainer, WidgetContainer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPosts } from "../../store";
import { PostToolbar, PostCreateWidget } from "./../../containers";

export const PostHotList = () => {
  const dispatch = useAppDispatch();

  const { posts, isLoading } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grid>
      <PostCreateWidget />
      <PostToolbar />
      <WidgetContainer isLoading={isLoading}>
        <PostContainer>
          {posts?.map(
            (
              { post_id, title, content, creator, created_at, updated_at },
              key
            ) => (
              <Box key={key}>
                <PostCard
                  post_id={post_id}
                  title={title}
                  content={content}
                  creator={creator}
                  created_at={created_at}
                  updated_at={updated_at}
                />
              </Box>
            )
          )}
        </PostContainer>
      </WidgetContainer>
    </Grid>
  );
};
