/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  TextField,
  Typography,
} from '@mui/material';
import { QuestionType } from 'types/questions';
import { UserResponse } from 'types/responses';

interface Props {
  userResponse: UserResponse;
}

const ResponseQuestion = ({ userResponse }: Props) => {
  switch (userResponse.type) {
    case QuestionType.Checkbox:
      return (
        <FormControl component="fieldset">
          <Typography variant="caption">{userResponse.title}</Typography>
          <FormGroup>
            {userResponse.options?.map(({ title }, i) => (
              <FormControlLabel
                key={title}
                control={
                  <Checkbox
                    inputProps={{ disabled: true }}
                    checked={userResponse.userValue.includes(title)}
                  />
                }
                label={title}
                value={title}
              />
            ))}
          </FormGroup>
        </FormControl>
      );
    case QuestionType.Radiobutton:
      return (
        <FormControl component="fieldset">
          <Typography variant="caption">{userResponse.title}</Typography>
          <FormGroup>
            {userResponse.options?.map(({ title }, i) => (
              <FormControlLabel
                key={title}
                control={
                  <Radio
                    inputProps={{ disabled: true }}
                    checked={userResponse.userValue.includes(title)}
                  />
                }
                label={title}
                value={title}
              />
            ))}
          </FormGroup>
        </FormControl>
      );
    default:
      return (
        <TextField
          fullWidth
          label={userResponse.title}
          value={userResponse.userValue}
          inputProps={{ disabled: true }}
        />
      );
  }
};

export default ResponseQuestion;
