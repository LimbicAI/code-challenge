import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from 'react-native';

const Login = ({navigation}) => (
  <View style={styles.container}>
    <Text>Login as a</Text>
    <Button title="Client" onPress={() => navigation.navigate('Client Home')} />
    <Text>or as a</Text>
    <Button
      title="Therapist"
      onPress={() => navigation.navigate('Therapist Home')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default Login;
