import React from 'react';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Stack } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const EmptyPlaceholder = ({ children }: Props) => {
  return (
    <Stack direction="column" alignItems="center">
      <SearchOffIcon />
      {children}
    </Stack>
  );
};

export default EmptyPlaceholder;
