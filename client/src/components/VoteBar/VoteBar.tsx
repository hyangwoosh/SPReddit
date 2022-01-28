import React from "react";

import { Box, IconButton } from "@mui/material";

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

interface VoteBarProps {
  count?: number;
  onUpVoteClick?: React.MouseEventHandler;
  onDownVoteClick?: React.MouseEventHandler;
}

export const VoteBar: React.FC<VoteBarProps> = ({
  count,
  onUpVoteClick,
  onDownVoteClick,
}) => {
  const styles = {
    button: { width: "28px", height: "28px", color: "var(--gray-light)" },
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "80px",
        background: "var(--black-0)",
        borderRadius: "var(--radius-5)",
        marginTop: "5px",
      }}
    >
      <Box>
        <IconButton style={styles.button}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
      <Box>{count}</Box>
      <Box>
        <IconButton style={styles.button}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

VoteBar.defaultProps = { count: 0 };
