import React from 'react';
import { CircularProgress } from '@mui/material';
import useQuestions from 'data/useQuestions';
import { Content, PageWrapper } from 'styles/common';

import QuestionnaireForm from './components/QuestionnaireForm';

const Questionnaire = () => {
  const { isFetching } = useQuestions();

  return (
    <PageWrapper>
      <Content>
        {isFetching ? <CircularProgress /> : <QuestionnaireForm />}
      </Content>
    </PageWrapper>
  );
};

export default Questionnaire;
