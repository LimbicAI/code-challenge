import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const QuestionsList = ({questions = [], itemOnPress, fetchMore}) => (
  <View style={styles.list}>
    <FlatList
      data={questions}
      keyExtractor={({id}) => `question-${id}`}
      ListEmptyComponent={<Text>Questions list is empty</Text>}
      renderItem={({item: {id, text}}) => (
        <TouchableOpacity
          key={id}
          onPress={() => itemOnPress(id)}
          style={styles.listItem}>
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    />
    <Button title="Fetch more" onPress={fetchMore} />
  </View>
);

const styles = StyleSheet.create({
  list: {
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  listItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
  itemOnPress: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default QuestionsList;
