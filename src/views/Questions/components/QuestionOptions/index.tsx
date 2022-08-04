import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import Input from 'components/Input';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { QuestionFormValues, QuestionType } from 'types/questions';

interface Props {
  questionIndex: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;

  > * {
    margin-top: 16px;
  }
`;

const AddButton = styled(Button)`
  align-self: flex-start;
`;

const QuestionOptions = ({ questionIndex }: Props) => {
  const { control } = useFormContext<QuestionFormValues>();
  const question = useWatch({ control, name: `questions.${questionIndex}` });

  const {
    fields: answerOptions,
    swap,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  if (
    ![QuestionType.Checkbox, QuestionType.Radiobutton].includes(question.type)
  ) {
    return null;
  }

  return (
    <Wrapper>
      {answerOptions.map(({ id }, optionIndex) => (
        <div key={id}>
          <Input
            size="small"
            name={`questions.${questionIndex}.options.${optionIndex}.title`}
          />
          <IconButton
            onClick={() => swap(optionIndex, optionIndex - 1)}
            disabled={optionIndex === 0}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={() => swap(optionIndex, optionIndex + 1)}
            disabled={optionIndex === answerOptions.length - 1}
          >
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton
            onClick={() => remove(optionIndex)}
            disabled={answerOptions.length === 1}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <AddButton
        onClick={() =>
          append({
            title: `Option ${answerOptions.length + 1}`,
          })
        }
      >
        Add an option
      </AddButton>
    </Wrapper>
  );
};

export default QuestionOptions;
