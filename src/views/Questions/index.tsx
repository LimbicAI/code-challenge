import React from 'react';
import { Delete } from '@mui/icons-material';
import { Button, CircularProgress, Stack } from '@mui/material';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import Title from 'components/Title';
import useQuestions from 'data/useQuestions';
import useAlert from 'hooks/useAlert';
import useTitle from 'hooks/useTitle';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Content, PageWrapper, Snackbar } from 'styles/common';
import { QuestionFormValues } from 'types/questions';
import { put } from 'utils/requests';
import { v4 } from 'uuid';

import Question from './components/Question';
import QuestionOptions from './components/QuestionOptions';
import QuestionRequired from './components/QuestionRequired';
import QuestionTypeSelect from './components/QuestionTypeSelect';
import * as Styled from './styles';
import { getDefaultQuestion } from './utils';

const Questions = () => {
  useTitle('Questions');
  const alert = useAlert();
  const { questions, isFetching: isFetchingQuestions, mutate } = useQuestions();
  const methods = useForm<QuestionFormValues>();
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
    const body = values.questions.map((q) => ({ ...q, id: q.id || v4() }));

    try {
      await put('questions', body);
      alert.onSuccess('Success');
      mutate();
      methods.reset({}, { keepValues: true });
    } catch {
      alert.onFailure('Something went wrong');
    }
  };

  return (
    <PageWrapper>
      <Title>Questions</Title>
      <Content>
        <FormProvider {...methods}>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            {isFetchingQuestions ? (
              <CircularProgress />
            ) : (
              <>
                <Styled.QuestionsWrapper>
                  {questionFields.map((field, id) => (
                    <div key={field.id}>
                      <Styled.Line>
                        <Question index={id} />
                        <QuestionTypeSelect questionPath={`questions.${id}`} />
                      </Styled.Line>
                      <Stack direction="row" justifyContent="space-between">
                        <QuestionRequired questionPath={`questions.${id}`} />
                        <Styled.IconButton onClick={() => remove(id)}>
                          <Delete />
                        </Styled.IconButton>
                      </Stack>
                      <QuestionOptions questionIndex={id} />
                    </div>
                  ))}
                </Styled.QuestionsWrapper>
                {!questionFields.length && (
                  <EmptyPlaceholder>
                    {isDirty
                      ? `You've removed all questions. Submit form to keep your changes`
                      : 'No questions. To create one, press button below'}
                  </EmptyPlaceholder>
                )}
              </>
            )}
            <Snackbar>
              <Stack
                direction="row"
                spacing={2}
                marginTop={2}
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  disabled={!isDirty || isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Button onClick={() => append(getDefaultQuestion())}>
                  Add new question
                </Button>
              </Stack>
            </Snackbar>
          </Styled.Form>
        </FormProvider>
      </Content>
    </PageWrapper>
  );
};

export default Questions;
