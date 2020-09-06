import React from 'react';
import PropTypes from 'prop-types';
import {useMutation, gql} from '@apollo/client';

import LoadingIndicator from './LoadingIndicator';
import ErrorText from './ErrorText';
import QuestionForm from './QuestionForm';

const CREATE_THERAPIST_QUESTION = gql`
  mutation CreateTherapistQuestion($therapistId: ID!, $text: String!) {
    createQuestion(therapistId: $therapistId, text: $text) {
      id
      text
    }
  }
`;

const CreateQuestionForm = ({therapistId, onSuccess}) => {
  const [createQuestion, {loading, error}] = useMutation(
    CREATE_THERAPIST_QUESTION,
    {
      onCompleted: onSuccess,
    },
  );

  if (loading) {
    return <LoadingIndicator text="Creating..." />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error creating question" />;
  }

  return (
    <QuestionForm
      onSubmit={({id, questionText}) =>
        createQuestion({
          variables: {
            text: questionText,
            therapistId,
          },
        })
      }
    />
  );
};

CreateQuestionForm.propTypes = {
  therapistId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateQuestionForm;
