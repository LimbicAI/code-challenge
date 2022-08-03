import React from 'react';
import { Delete } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import Title from 'components/Title';
import useAlert from 'hooks/useAlert';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { PageWrapper } from 'styles/common';
import { v4 } from 'uuid';

import useQuestions from '../../data/useQuestions';
import { QuestionFormValues, QuestionType } from '../../types/questions';
import { put } from '../../utils/requests';
import Question from './components/Question';
import QuestionOptions from './components/QuestionOptions';
import * as Styled from './styles';
import { defaultQuestion } from './utils';

const defaultValues: QuestionFormValues = {
  questions: [
    {
      id: '1',
      title: 'Question 1',
      description: 'Description for question 1',
      type: QuestionType.FreeText,
    },
    {
      id: '2',
      title: 'Question 2',
      description: 'Description for question 2',
      type: QuestionType.FreeText,
    },
  ],
};

const Questions = () => {
  const alert = useAlert();
  const { data: questions, isFetching: isFetchingQuestions } = useQuestions();
  const methods = useForm<QuestionFormValues>({
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = methods;
  const {
    fields: questionFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  React.useEffect(() => {
    if (questions?.length) {
      methods.reset({ questions });
    }
  }, [questions]);

  const onSubmit: SubmitHandler<QuestionFormValues> = async (values) => {
    const body = values.questions.map((q) => ({ ...q, id: q.id ?? v4() }));

    try {
      await put('questions', body);
      alert.onSuccess('Success');
    } catch {
      alert.onFailure('Something went wrong');
    }
  };

  return (
    <PageWrapper>
      <Title>Questions</Title>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isFetchingQuestions ? (
            <CircularProgress />
          ) : (
            <Styled.QuestionsWrapper>
              <Button onClick={() => append(defaultQuestion)}>
                Add new question
              </Button>
              {questionFields.map((field, id) => (
                <Styled.QuestionWrapper key={field.id}>
                  <Styled.Line>
                    <Question index={id} />
                    <Styled.IconButton onClick={() => remove(id)}>
                      <Delete />
                    </Styled.IconButton>
                  </Styled.Line>
                  <QuestionOptions questionIndex={id} />
                </Styled.QuestionWrapper>
              ))}
            </Styled.QuestionsWrapper>
          )}
          <Styled.Submit
            variant="outlined"
            disabled={!isDirty || isSubmitting}
            type="submit"
          >
            Submit
          </Styled.Submit>
        </form>
      </FormProvider>
    </PageWrapper>
  );
};

export default Questions;
