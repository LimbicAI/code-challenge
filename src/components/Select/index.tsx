import React from 'react';
import { MenuItem, MenuItemProps, SelectProps, TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

import { RHFInputProps } from '../Input';

interface RHFSelectOptions extends MenuItemProps {
  value: string | number;
  children?: React.ReactNode;
  display?: React.ReactNode | string;
}

export interface RHFSelectProps<T> extends RHFInputProps<T> {
  options: RHFSelectOptions[];
  selectProps?: SelectProps;
}

function Select<T extends FieldValues>({
  name,
  options,
  ...rest
}: RHFSelectProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          size="small"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
          }}
          value={value ?? ''}
          select
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} {...option}>
              {option.display || option.children}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

export default Select;
