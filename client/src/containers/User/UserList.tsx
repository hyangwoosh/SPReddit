import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { PostCard, PostContainer, Card } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPosts, getUsers } from "../../store";

export const UserList = () => {
  const dispatch = useAppDispatch();

  const { users, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log({ users });
  }, [users]);

  return (
    <Card isLoading={isLoading}>
      {/* <PostContainer>
        {users?.map(
          (
            { user_id, title, content, creator, created_at, updated_at },
            key
          ) => (
            <Box>
              <PostCard
                key={key}
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
      </PostContainer> */}
    </Card>
  );
};
