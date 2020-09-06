import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';

const ErrorText = ({text}) => (
  <View>
    <Text style={styles.errorText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: 'red',
    padding: 5,
    marginBottom: 10,
  },
});

ErrorText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorText;
