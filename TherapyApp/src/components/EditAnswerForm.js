import React from 'react';
import PropTypes from 'prop-types';
import {useMutation, gql} from '@apollo/client';

import LoadingIndicator from './LoadingIndicator';
import ErrorText from './ErrorText';
import AnswerForm from './AnswerForm';

const UPDATE_CLIENT_ANSWER = gql`
  mutation UpdateClientAnswer($id: ID!, $text: String) {
    updateAnswer(id: $id, text: $text) {
      id
      text
    }
  }
`;

const EditAnswerForm = ({questionText, id, text}) => {
  const [updateAnswer, {loading, error}] = useMutation(UPDATE_CLIENT_ANSWER);

  if (loading) {
    return <LoadingIndicator text="Updating..." />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error updating answer" />;
  }

  return (
    <AnswerForm
      questionText={questionText}
      id={id}
      text={text}
      onSubmit={({id, answerText}) =>
        updateAnswer({
          variables: {
            id,
            answerText,
          },
        })
      }
    />
  );
};

EditAnswerForm.propTypes = {
  questionText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default EditAnswerForm;
