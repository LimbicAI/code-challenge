import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import PageTitle from '../components/PageTitle';
import ErrorText from '../components/ErrorText';
import LoadingIndicator from '../components/LoadingIndicator';

export const GET_THERAPIST_CLIENT = gql`
  query GetTherapistClient($clientId: ID!) {
    client(id: $clientId) {
      id
      firstName
      lastName
      email
      answers {
        id
        text
      }
    }
  }
`;

const TherapistClient = ({route}) => {
  const {clientId} = route.params;

  const {loading, error, data} = useQuery(GET_THERAPIST_CLIENT, {
    variables: {
      clientId,
    },
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error getting client details" />;
  }

  const {client = {}} = data;
  const {firstName, lastName, email, answers = []} = client;

  return (
    <View>
      <PageTitle text="Client Details" />

      <View style={styles.container}>
        <Text>
          <Text style={styles.fieldTitle}>First name:</Text>
          {firstName}
        </Text>
        <Text>
          <Text style={styles.fieldTitle}>Last name:</Text>
          {lastName}
        </Text>
        <Text>
          <Text style={styles.fieldTitle}>Email:</Text>
          {email}
        </Text>
        <Text style={styles.fieldTitle}>Answers:</Text>
        <FlatList
          data={answers}
          keyExtractor={({id}) => `answer-${id}`}
          ListEmptyComponent={<Text>Answers list is empty</Text>}
          renderItem={({item: {id, text}}) => <Text>- {text}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  fieldTitle: {
    fontWeight: '600',
  },
});

TherapistClient.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string.isRequired,
    }),
  }),
};

export default TherapistClient;
