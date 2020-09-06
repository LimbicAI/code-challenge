import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import PageTitle from '../components/PageTitle';
import ErrorText from '../components/ErrorText';
import LoadingIndicator from '../components/LoadingIndicator';
import EditQuestionForm from '../components/EditQuestionForm';
import DeleteQuestionButton from '../components/DeleteQuestionButton';

export const GET_QUESTION = gql`
  query GetTherapistQuestion($questionId: ID!) {
    question(id: $questionId) {
      text
    }
  }
`;

const TherapistQuestion = ({navigation, route}) => {
  const {questionId} = route.params;
  const {loading, error, data, refetch} = useQuery(GET_QUESTION, {
    variables: {questionId},
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error fetching question data" />;
  }

  const {question = {}} = data;
  const {text} = question;

  const onDelete = () => {
    navigation.goBack();
  };

  return (
    <View>
      <PageTitle text="Edit Question" />

      <EditQuestionForm id={questionId} text={text} onSuccess={refetch} />

      <DeleteQuestionButton id={questionId} onSuccess={onDelete} />
    </View>
  );
};

TherapistQuestion.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      questionId: PropTypes.string.isRequired,
    }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
};

export default TherapistQuestion;
