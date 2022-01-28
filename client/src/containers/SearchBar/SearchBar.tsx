import React from "react";
import { Grid, TextField } from "@mui/material";
import _ from "lodash";
import { getPosts } from "../../store";
import { useAppDispatch } from "../../hooks";

export const SearchBar = () => {
  const dispatch = useAppDispatch();

  const search = _.throttle((query) => {
    console.log({ query });

    dispatch(getPosts({ filter: { title: query } }));
  }, 1000);

  const handleSubmit = (e: React.MouseEvent<any>) => {
    e?.preventDefault();
  };

  const handleSearch = (e: React.ChangeEvent<any>) => {
    search(e.target.value);
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            style={{ margin: "0px auto" }}
            type="text"
            placeholder="Type Something"
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
    </form>
  );
};
