import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import PageTitle from '../components/PageTitle';
import ErrorText from '../components/ErrorText';
import LoadingIndicator from '../components/LoadingIndicator';
import QuestionsList from '../components/QuestionsList';

import {therapistId, clientId} from '../constants';

const GET_THERAPIST_QUESTIONS = gql`
  query GetTherapistQuestions($therapistId: ID!) {
    questions(therapistId: $therapistId) {
      id
      text
    }
  }
`;

const HomeClient = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_THERAPIST_QUESTIONS, {
    // This is for test only
    variables: {therapistId},
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
      <PageTitle text="Home" />

      <QuestionsList
        questions={questions}
        itemOnPress={(id) =>
          navigation.navigate('Answer Question', {
            questionId: id,
            clientId,
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

HomeClient.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default HomeClient;
