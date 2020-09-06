import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import PageTitle from '../components/PageTitle';
import ErrorText from '../components/ErrorText';
import LoadingIndicator from '../components/LoadingIndicator';
import QuestionsList from '../components/QuestionsList';
import CreateQuestionForm from '../components/CreateQuestionForm';

import {therapistId} from '../constants';

export const GET_THERAPIST_QUESTIONS = gql`
  query GetTherapistQuestions($therapistId: ID!) {
    questions(therapistId: $therapistId) {
      id
      text
    }
  }
`;

const TherapistQuestions = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery(GET_THERAPIST_QUESTIONS, {
    variables: {therapistId},
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error getting questions" />;
  }

  const {questions = []} = data;

  return (
    <View>
      <PageTitle text="Questions" />

      <CreateQuestionForm
        therapistId={therapistId}
        onSuccess={() => refetch()}
      />

      <QuestionsList
        questions={questions}
        itemOnPress={(id) =>
          navigation.navigate('Therapist Question', {
            questionId: id,
          })
        }
        fetchMore={() =>
          // eslint-disable-next-line no-alert
          alert('Future feature. Probably using GraphQL cursors.')
        }
      />
    </View>
  );
};

TherapistQuestions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default TherapistQuestions;
