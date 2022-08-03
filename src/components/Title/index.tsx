import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  children: string;
}

const Title = ({ children }: Props) => {
  return (
    <Typography align="center" variant="h2" component="h1">
      {children}
    </Typography>
  );
};

export default Title;
