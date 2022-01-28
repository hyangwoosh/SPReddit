import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { Box, Button, Grid, TextField } from "@mui/material";

import { IPost } from "../../../interfaces";
import { Card } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createPost, getPostByKey, getPosts, updatePost } from "../../../store";

export const PostEdit = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const redirect = useNavigate();

  type PostEditSchema = {
    title: string;
    content: string;
  };

  const { post, isLoading } = useAppSelector((state) => state.post);

  // Handlers
  const handleSubmit = async (values: PostEditSchema) => {
    const data = { ...values };

    if (!id) return;

    const updated = await dispatch(updatePost(id, data));
    // if (!updated) return;

    alert("Saved!");
    // return redirect(`/posts/${created.id}`);
  };

  // Form
  const validationSchema: yup.SchemaOf<PostEditSchema> = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
  });

  const initialValues = { title: "", content: "" };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (id) dispatch(getPostByKey(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!post) return;

    const { title, content } = post;
    formik.setValues({ title, content });
  }, [post]);

  return (
    <Card isLoading={isLoading}>
      <Box>
        <h2>Edit Post #{id}</h2>
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
            <Button type="submit">Save</Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};
