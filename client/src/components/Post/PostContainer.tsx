import React, { useEffect } from "react";
import styles from "./Post.module.scss";

import { Box } from "@mui/material";
import { useAppSelector } from "../../hooks";

export const PostContainer: React.FC = ({ children }) => {
  const { postLayout } = useAppSelector((state) => state.app);

  const isGrid = postLayout === "grid";

  return (
    <Box
      className={
        isGrid ? styles.PostContainer__Grid : styles.PostContainer__List
      }
    >
      {children}
    </Box>
  );
};
