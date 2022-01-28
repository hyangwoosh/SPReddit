import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, Grid, TextField } from "@mui/material";

import { IPost } from "../../../interfaces";
import { Card } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createPost, getPostByKey, getPosts } from "../../../store";

export const PostCreate = () => {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  type PostCreateSchema = {
    title: string;
    content: string;
  };

  // Handlers
  const handleSubmit = async (values: PostCreateSchema) => {
    const data = {
      ...values,
      creator: "morgan",
    };

    const created = await dispatch(createPost(data));
    if (!created) return;

    return redirect(`/posts/${created.id}`);
  };

  // Form

  const validationSchema: yup.SchemaOf<PostCreateSchema> = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
  });

  const initialValues = { title: "", content: "" };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Card>
      <Box>
        <h2>Create Post</h2>
      </Box>
      <Box style={{ padding: "10px 0px" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            type="text"
            label="Content"
            name="content"
            multiline
            rows={5}
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          <Box style={{ marginTop: "5px" }}>
            <Button type="submit">Create</Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};
