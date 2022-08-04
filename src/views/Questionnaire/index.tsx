import React from 'react';
import { CircularProgress } from '@mui/material';
import useQuestions from 'data/useQuestions';
import useTitle from 'hooks/useTitle';
import { Content, PageWrapper } from 'styles/common';

import QuestionnaireForm from './components/QuestionnaireForm';

const Questionnaire = () => {
  const { isFetching } = useQuestions();
  useTitle('Questionnaire');

  return (
    <PageWrapper>
      <Content>
        {isFetching ? <CircularProgress /> : <QuestionnaireForm />}
      </Content>
    </PageWrapper>
  );
};

export default Questionnaire;
