import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';

const LoadingIndicator = ({text = 'Loading...'}) => (
  <View>
    <Text style={styles.loadingIndicator}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingIndicator: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: 'purple',
    padding: 5,
    marginBottom: 10,
  },
});

LoadingIndicator.propTypes = {
  text: PropTypes.string,
};

export default LoadingIndicator;
