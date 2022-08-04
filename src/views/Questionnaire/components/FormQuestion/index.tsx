import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Input from 'components/Input';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Question, QuestionType } from 'types/questions';

interface Props {
  question: Question;
}

const FormQuestion = ({ question }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  switch (question.type) {
    case QuestionType.Checkbox:
      return (
        <>
          <FormControl component="fieldset">
            <Typography variant="caption">{question.title}</Typography>
            <FormGroup>
              {question.options?.map(({ title }, i) => (
                <Controller
                  key={title}
                  name={`${question.id}[${i}]`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={!!field.value} />}
                      label={title}
                      value={title}
                    />
                  )}
                />
              ))}
            </FormGroup>
          </FormControl>
        </>
      );
    case QuestionType.Radiobutton:
      return (
        <FormControl component="fieldset">
          <Typography variant="caption">{question.title}</Typography>
          <Controller
            key={question.title}
            name={question.id as string}
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} value={field.value || ''}>
                {question.options?.map(({ title }) => (
                  <FormControlLabel
                    key={`${question.id}${title}`}
                    control={<Radio />}
                    label={title}
                    value={title}
                  />
                ))}
              </RadioGroup>
            )}
          />
          {errors[question.id] && (
            <FormHelperText error>
              {(errors[question.id] as unknown as FieldError).message}
            </FormHelperText>
          )}
        </FormControl>
      );
    default:
      return (
        <Input fullWidth name={question.id as string} label={question.title} />
      );
  }
};

export default FormQuestion;
