import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const Logo = () => (
  <Box style={{ maxWidth: '110px' }}>
    <Link to="/" style={{ color: 'var(--gray-light)' }}>
      <h2>SPReddit</h2>
    </Link>
  </Box>
);
