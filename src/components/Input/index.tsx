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
      rules={{
        required: {
          value: !!rest.required,
          message: 'Field is required',
        },
      }}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { error, isTouched },
      }) => (
        <TextField
          inputRef={ref}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
          }}
          value={value || ''}
          error={isTouched && !!error}
          helperText={
            isTouched && error ? error.message || error.type : helperText
          }
          {...rest}
        />
      )}
    />
  );
}

export default Input;
