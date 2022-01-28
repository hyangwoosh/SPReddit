import React from 'react';
import { Box } from '@mui/material';

export const RootWrapper: React.FC = ({ children }) => (
  <Box
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      width: '100%',
      height: 'auto',
      minHeight: '100vh',
    }}>
    {children}
  </Box>
);
