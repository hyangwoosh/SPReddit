import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import {
  Card,
  PostCard,
  Spinner,
  VoteBar,
  WidgetContainer,
} from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getUserByKey } from "../../../store";

export const UserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const { user, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) dispatch(getUserByKey(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Card style={{ marginBottom: "10px" }} isLoading={isLoading}>
      <Box style={{ marginBottom: "10px" }}>
        <h1>User {user?.username}</h1>
      </Box>
      <Box style={{ padding: "3px 0px" }}>
        <span>Email: {user?.email}</span>
      </Box>
      <Box style={{ padding: "3px 0px" }}>
        <span>Username: {user?.username}</span>
      </Box>
      <Box style={{ padding: "3px 0px" }}>
        <span>Role: {user?.role}</span>
      </Box>
      <Box></Box>
    </Card>
  );
};
