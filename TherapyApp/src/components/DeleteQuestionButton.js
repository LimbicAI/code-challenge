import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, View} from 'react-native';
import {useMutation, gql} from '@apollo/client';

import LoadingIndicator from './LoadingIndicator';
import ErrorText from './ErrorText';

const DELETE_QUESTION = gql`
  mutation CreateTherapistQuestion($questionId: ID!) {
    deleteQuestion(id: $questionId) {
      id
    }
  }
`;

const DeleteQuestionButton = ({id, onSuccess}) => {
  const [deleteQuestion, {loading, error}] = useMutation(DELETE_QUESTION, {
    onCompleted: onSuccess,
  });

  if (loading) {
    return <LoadingIndicator text="Deleting..." />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error deleting question" />;
  }

  const proceedDeleting = () =>
    deleteQuestion({
      variables: {
        questionId: id,
      },
    });

  const cancelDeleting = () => console.log('Cancel was pressed');

  const deleteWithConfirmation = () => {
    Alert.alert('Are you sure you want to delete question?', '', [
      {
        text: 'Cancel',
        onPress: cancelDeleting,
      },
      {
        text: 'Confirm',
        onPress: proceedDeleting,
      },
    ]);
  };

  return (
    <View>
      <Button
        color="red"
        title="Delete Question"
        onPress={deleteWithConfirmation}
      />
    </View>
  );
};

DeleteQuestionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default DeleteQuestionButton;
