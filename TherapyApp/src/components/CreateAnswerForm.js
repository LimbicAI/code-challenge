import React from 'react';
import PropTypes from 'prop-types';
import {useMutation, gql} from '@apollo/client';

import LoadingIndicator from './LoadingIndicator';
import ErrorText from './ErrorText';
import AnswerForm from './AnswerForm';

const CREATE_CLIENT_ANSWER = gql`
  mutation CreateClientAnswer(
    $clientId: ID!
    $questionId: ID!
    $answerText: String!
  ) {
    createAnswer(
      clientId: $clientId
      questionId: $questionId
      text: $answerText
    ) {
      id
      text
    }
  }
`;

const CreateAnswerForm = ({questionId, clientId, questionText}) => {
  const [createAnswer, {loading, error}] = useMutation(CREATE_CLIENT_ANSWER);

  if (loading) {
    return <LoadingIndicator text="Submitting..." />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error submitting answer" />;
  }

  return (
    <AnswerForm
      questionText={questionText}
      onSubmit={({answerText}) =>
        createAnswer({
          variables: {
            questionId,
            answerText,
            clientId,
          },
        })
      }
      clientId={clientId}
    />
  );
};

CreateAnswerForm.propTypes = {
  questionId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
};

export default CreateAnswerForm;
