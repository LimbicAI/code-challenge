import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';

const PageTitle = ({text}) => (
  <View>
    <Text style={styles.sectionTitle}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    padding: 5,
    marginBottom: 10,
  },
});

PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageTitle;
