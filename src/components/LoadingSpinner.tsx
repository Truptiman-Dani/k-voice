// src/components/LoadingSpinner.tsx
import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
