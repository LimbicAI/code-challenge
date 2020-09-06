import React from 'react';
import PropTypes from 'prop-types';
import {useMutation, gql} from '@apollo/client';

import LoadingIndicator from './LoadingIndicator';
import ErrorText from './ErrorText';
import QuestionForm from './QuestionForm';

const UPDATE_THERAPIST_QUESTION = gql`
  mutation UpdateTherapistQuestion($id: ID!, $text: String!) {
    updateQuestion(id: $id, text: $text) {
      id
      text
    }
  }
`;

const EditQuestionForm = ({id, text, onSuccess}) => {
  const [
    updateQuestion,
    {loading, error},
  ] = useMutation(UPDATE_THERAPIST_QUESTION, {onCompleted: onSuccess});

  if (loading) {
    return <LoadingIndicator text="Updating..." />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error updating question" />;
  }

  return (
    <QuestionForm
      id={id}
      text={text}
      onSubmit={({id, questionText}) =>
        updateQuestion({
          variables: {
            id,
            text: questionText,
          },
        })
      }
    />
  );
};

EditQuestionForm.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditQuestionForm;
