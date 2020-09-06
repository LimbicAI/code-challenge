import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import PageTitle from '../components/PageTitle';
import ErrorText from '../components/ErrorText';
import LoadingIndicator from '../components/LoadingIndicator';
import ClientsList from '../components/ClientsList';

export const GET_THERAPIST_CLIENTS = gql`
  query GetTherapistClients {
    clients {
      id
      firstName
      lastName
    }
  }
`;

const TherapistClients = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_THERAPIST_CLIENTS);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.error(error);

    return <ErrorText text="Error getting clients" />;
  }

  const {clients = []} = data;

  return (
    <View>
      <PageTitle text="Clients list" />

      <ClientsList
        clients={clients}
        itemOnPress={(id) =>
          navigation.navigate('Therapist Client', {
            clientId: id,
          })
        }
        fetchMore={() => {
          // eslint-disable-next-line no-alert
          alert('Future feature. Probably using GraphQL cursors.');
        }}
      />
    </View>
  );
};

TherapistClients.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default TherapistClients;
