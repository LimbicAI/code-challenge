import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Input from 'components/Input';
import { Controller, useFormContext } from 'react-hook-form';
import { Question, QuestionType } from 'types/questions';

interface Props {
  question: Question;
}

const FormQuestion = ({ question }: Props) => {
  const { control } = useFormContext();

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
        </FormControl>
      );
    default:
      return <Input name={question.id as string} label={question.title} />;
  }
};

export default FormQuestion;
