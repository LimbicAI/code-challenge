import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export interface RHFInputProps<T> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  required?: boolean;
}

function Input<T extends FieldValues>({
  name,
  helperText,
  ...rest
}: RHFInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { error },
      }) => (
        <TextField
          inputRef={ref}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
          }}
          value={value || ''}
          error={!!error}
          helperText={error ? error.message || error.type : helperText}
          {...rest}
        />
      )}
    />
  );
}

export default Input;