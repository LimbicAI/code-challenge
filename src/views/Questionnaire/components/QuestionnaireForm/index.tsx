import React, { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Input from 'components/Input';
import Title from 'components/Title';
import useQuestions from 'data/useQuestions';
import useAlert from 'hooks/useAlert';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { QuestionType } from 'types/questions';
import { QuestionnaireResponse, UserResponse } from 'types/responses';
import { isOptionsQuestion } from 'utils';
import { requiredMessage } from 'utils/constants';
import { post } from 'utils/requests';
import { v4 } from 'uuid';
import * as yup from 'yup';

import FormQuestion from '../FormQuestion';

interface FormValues {
  name: string;
  [key: string]: string | string[] | boolean[];
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 600px;
  width: 100%;
  align-self: center;

  > div:not(:last-child) {
    padding-bottom: 8px;
    border-bottom: 1px solid #f7f7f7;
  }
`;

const QuestionWrapper = styled.div`
  margin-top: 8px;
`;

const QuestionnaireForm = () => {
  const { questions } = useQuestions();

  const schema = useMemo(() => {
    return yup.object({
      name: yup.string().required(requiredMessage),
      ...questions.reduce((schemaInProgress, question) => {
        const id = question.id as string;
        const isMultipleOptions = question.type === QuestionType.Checkbox;

        if (question.required) {
          return {
            ...schemaInProgress,
            [id]: isMultipleOptions
              ? yup
                  .array()
                  .transform((value) =>
                    value.length > 1 ? value.filter((v: string) => !!v) : value
                  )
                  .min(1, requiredMessage)
              : yup.string().min(10).required(requiredMessage),
          };
        }
        return {
          ...schemaInProgress,
          [id]: isMultipleOptions ? yup.array() : yup.string(),
        };
      }, {}),
    });
  }, [questions]);

  const defaultValues = useMemo(
    () =>
      questions.reduce(
        (pv, cv) => ({
          ...pv,
          [cv.id as string]: undefined,
        }),
        {}
      ),
    [questions]
  );

  const alert = useAlert();
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    formState: { isDirty, isSubmitting },
  } = methods;

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
      methods.reset({}, { keepValues: true });
    } catch {
      alert.onFailure('Something went wrong');
    }
  };
  return (
    <FormProvider {...methods}>
      <Title>Questionnaire</Title>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <QuestionWrapper>
          <Input fullWidth name="name" label="Name" />
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
  );
};

export default QuestionnaireForm;
