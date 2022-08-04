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
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const label = question.required ? `${question.title}*` : question.title;

  switch (question.type) {
    case QuestionType.Checkbox:
      return (
        <FormControl component="fieldset">
          <Typography variant="caption">{label}</Typography>
          <FormGroup>
            {question.options?.map(({ title }, i) => (
              <Controller
                key={title}
                name={`${question.id}[${i}]`}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          clearErrors(question.id);
                        }}
                        checked={!!field.value}
                      />
                    }
                    label={title}
                    value={title}
                  />
                )}
              />
            ))}
            {errors[question.id] && (
              <FormHelperText error>
                {(errors[question.id] as unknown as FieldError).message}
              </FormHelperText>
            )}
          </FormGroup>
        </FormControl>
      );
    case QuestionType.Radiobutton:
      return (
        <FormControl component="fieldset">
          <Typography variant="caption">{label}</Typography>
          <Controller
            key={question.title}
            name={question.id as string}
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
      return <Input fullWidth name={question.id as string} label={label} />;
  }
};

export default FormQuestion;
