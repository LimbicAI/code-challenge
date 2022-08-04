import React from 'react';
import { Delete } from '@mui/icons-material';
import { Button, CircularProgress, Stack } from '@mui/material';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import Title from 'components/Title';
import useAlert from 'hooks/useAlert';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Content, PageWrapper } from 'styles/common';
import { v4 } from 'uuid';

import useQuestions from '../../data/useQuestions';
import { QuestionFormValues } from '../../types/questions';
import { put } from '../../utils/requests';
import Question from './components/Question';
import QuestionOptions from './components/QuestionOptions';
import * as Styled from './styles';
import { defaultQuestion } from './utils';

const Questions = () => {
  const alert = useAlert();
  const { data: questions, isFetching: isFetchingQuestions } = useQuestions();
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
    const body = values.questions.map((q) => ({ ...q, id: q.id ?? v4() }));

    try {
      await put('questions', body);
      alert.onSuccess('Success');
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {isFetchingQuestions ? (
              <CircularProgress />
            ) : (
              <>
                <Styled.QuestionsWrapper>
                  {questionFields.map((field, id) => (
                    <div key={field.id}>
                      <Styled.Line>
                        <Question index={id} />
                        <Styled.IconButton onClick={() => remove(id)}>
                          <Delete />
                        </Styled.IconButton>
                      </Styled.Line>
                      <QuestionOptions questionIndex={id} />
                    </div>
                  ))}
                </Styled.QuestionsWrapper>
                {!questionFields.length && (
                  <EmptyPlaceholder>
                    {isDirty
                      ? `You've removed all question. Submit form to keep your changes`
                      : 'No questions. To create one, press button below'}
                  </EmptyPlaceholder>
                )}
              </>
            )}
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
              <Button onClick={() => append(defaultQuestion)}>
                Add new question
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Content>
    </PageWrapper>
  );
};

export default Questions;
