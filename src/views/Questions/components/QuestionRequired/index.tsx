import React from 'react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Path, useFormContext } from 'react-hook-form';
import { Question, QuestionFormValues } from 'types/questions';

interface Props {
  questionPath: Path<QuestionFormValues>;
}

const QuestionRequired = ({ questionPath }: Props) => {
  const { watch, setValue } = useFormContext<QuestionFormValues>();
  const question = watch(questionPath) as Question;

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={!!question.required}
            onChange={(e) => {
              const { checked } = e.target;
              setValue(
                questionPath,
                { ...question, required: checked },
                { shouldDirty: true }
              );
            }}
          />
        }
        label="Required"
      />
    </FormGroup>
  );
};

export default QuestionRequired;
