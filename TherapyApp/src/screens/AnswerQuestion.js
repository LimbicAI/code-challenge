import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import PageTitle from '../components/PageTitle';
import ErrorText from '../components/ErrorText';
import LoadingIndicator from '../components/LoadingIndicator';
import CreateAnswerForm from '../components/CreateAnswerForm';

export const GET_QUESTION = gql`
  query GetTherapistQuestion($questionId: ID!) {
    question(id: $questionId) {
      id
      text
    }
  }
`;

const AnswerQuestion = ({route}) => {
  const {questionId, clientId} = route.params;

  const {loading, error, data} = useQuery(GET_QUESTION, {
    variables: {questionId},
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error fetching question data..." />;
  }

  const {question = {}} = data;
  const {id, text} = question;

  return (
    <View>
      <PageTitle text="Answer Question" />
      <CreateAnswerForm
        questionId={questionId}
        clientId={clientId}
        questionText={text}
      />
    </View>
  );
};

AnswerQuestion.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      questionId: PropTypes.string.isRequired,
      clientId: PropTypes.string.isRequired,
    }),
  }),
};

export default AnswerQuestion;
