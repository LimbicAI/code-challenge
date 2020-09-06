import React from 'react';
import PropTypes from 'prop-types';
import {Button, View, StyleSheet, Text} from 'react-native';

import PageTitle from '../components/PageTitle';

const HomeTherapist = ({navigation}) => (
  <View style={styles.container}>
    <PageTitle text="Home" />
    <Text>You can view list of</Text>
    <Button
      title="Clients"
      onPress={() => navigation.navigate('Therapist Clients')}
    />
    <Text>or list of</Text>
    <Button
      title="Questions"
      onPress={() => navigation.navigate('Therapist Questions')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

HomeTherapist.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default HomeTherapist;
