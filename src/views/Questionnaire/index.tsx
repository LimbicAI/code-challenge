import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import Input from 'components/Input';
import Title from 'components/Title';
import useQuestions from 'data/useQuestions';
import useAlert from 'hooks/useAlert';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Content, PageWrapper } from 'styles/common';
import { QuestionType } from 'types/questions';
import { QuestionnaireResponse, UserResponse } from 'types/responses';
import { isOptionsQuestion } from 'utils';
import { post } from 'utils/requests';
import { v4 } from 'uuid';

import FormQuestion from './components/FormQuestion';

interface FormValues {
  name: string;
  [key: string]: string | string[] | boolean[];
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 600px;
  align-self: center;

  > div:not(:last-child) {
    padding-bottom: 8px;
    border-bottom: 1px solid #f7f7f7;
  }
`;

const QuestionWrapper = styled.div`
  margin-top: 8px;
`;

const Questionnaire = () => {
  const { data: questions, isFetching } = useQuestions();
  const alert = useAlert();
  const methods = useForm<FormValues>({ defaultValues: {} });
  const {
    formState: { isDirty, isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (questions) {
      const defaultVals = questions.reduce(
        (pv, cv) => ({
          ...pv,
          [cv.id as string]: isOptionsQuestion(cv)
            ? cv.options?.map(() => false)
            : '',
        }),
        {}
      );
      methods.reset(defaultVals);
    }
  }, [questions]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const responses: UserResponse[] = questions?.map((question) => {
      const response: UserResponse = { ...question } as UserResponse;
      if (question.type === QuestionType.Checkbox) {
        const boolArray: boolean[] = values[question.id as string] as boolean[];
        const actualValues = boolArray
          .map(
            (val, optionIndex) => val && question.options?.[optionIndex].title
          )
          .filter((v) => !!v) as string[];
        response.userValue = actualValues;
      } else {
        response.userValue = values[question.id as string] as string | string[];
      }

      return response;
    }) as UserResponse[];
    const body: QuestionnaireResponse = {
      responses,
      id: v4(),
      date: new Date().toISOString(),
    };

    try {
      await post(`responses/${values.name}`, body);
      alert.onSuccess('Success');
    } catch {
      alert.onFailure('Something went wrong');
    }
  };

  return (
    <PageWrapper>
      <Content>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <FormProvider {...methods}>
            <Title>Questionnaire</Title>
            <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
              <QuestionWrapper>
                <Input name="name" label="Name" />
              </QuestionWrapper>
              {questions?.map((question) => (
                <QuestionWrapper key={question.id}>
                  <FormQuestion question={question} />
                </QuestionWrapper>
              ))}
              <Button disabled={!isDirty || isSubmitting} type="submit">
                Submit
              </Button>
            </StyledForm>
          </FormProvider>
        )}
      </Content>
    </PageWrapper>
  );
};

export default Questionnaire;
