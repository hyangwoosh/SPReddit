import React, { useEffect, useState } from "react";

import { Box, Button, Grid } from "@mui/material";
import { PostCard, PostContainer, WidgetContainer } from "../../components";
import { PostToolbar, PostCreateWidget } from "./../../containers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPosts } from "../../store";
import { IPost } from "../../interfaces";

export const PostList = () => {
  const dispatch = useAppDispatch();

  const elementsPerPage = 5;
  const [page, setPage] = useState(1);

  const [localPosts, setLocalPosts] = useState<IPost[]>([]);
  const { posts, isLoading } = useAppSelector((state) => state.post);

  const isContent = localPosts.length < posts.length;

  const handleLoadMore = (e: React.MouseEvent<any>) => {
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setLocalPosts(posts?.slice(0, elementsPerPage));
  }, [posts]);

  useEffect(() => {
    setLocalPosts(posts.slice(0, page * elementsPerPage));
  }, [page]);

  return (
    <Grid>
      <PostCreateWidget />
      <PostToolbar />
      <WidgetContainer isLoading={isLoading}>
        <PostContainer>
          {localPosts?.map(
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
        {isContent && (
          <Button variant="outlined" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </WidgetContainer>
    </Grid>
  );
};
