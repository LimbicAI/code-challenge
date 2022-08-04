import React from 'react';
import {
  DialpadOutlined,
  DoneAll,
  HdrStrong,
  TextFields,
} from '@mui/icons-material';
import Select from 'components/Select';
import { Path, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Option, QuestionFormValues, QuestionType } from 'types/questions';
import { defaultChoiceQuestion } from 'views/Questions/utils';

interface Props {
  questionPath: Path<QuestionFormValues>;
}

const SelectOption = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;

    margin-right: 0.5rem;
  }
`;

export const templateQuestionOptions = [
  {
    value: QuestionType.Number,
    display: (
      <SelectOption>
        <DialpadOutlined /> Number
      </SelectOption>
    ),
  },
  {
    value: QuestionType.Radiobutton,
    display: (
      <SelectOption>
        <HdrStrong />
        Radio
      </SelectOption>
    ),
  },
  {
    value: QuestionType.Checkbox,
    display: (
      <SelectOption>
        <DoneAll />
        Checkbox
      </SelectOption>
    ),
  },
  {
    value: QuestionType.FreeText,
    display: (
      <SelectOption>
        <TextFields />
        Text
      </SelectOption>
    ),
  },
];

const QuestionTypeSelect = ({ questionPath, ...rest }: Props) => {
  const { getValues, setValue } = useFormContext<QuestionFormValues>();

  return (
    <Select
      name={`${questionPath}.type` as const}
      options={templateQuestionOptions}
      size="medium"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const question = getValues(questionPath as 'questions.0');
        const simpleOptions = [QuestionType.FreeText, QuestionType.Number];
        if (
          simpleOptions.includes(question.type) &&
          !question.options?.length
        ) {
          setValue(
            `${questionPath}.options` as 'questions.0.options',
            [...(defaultChoiceQuestion.options as Option[])],
            { shouldDirty: true }
          );
        }
        setValue(
          `${questionPath}.type` as 'questions.0.type',
          e.target.value as unknown as QuestionType,
          { shouldDirty: true }
        );
      }}
      {...rest}
    />
  );
};

export default QuestionTypeSelect;
