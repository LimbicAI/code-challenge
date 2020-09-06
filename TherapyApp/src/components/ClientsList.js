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

const ClientsList = ({clients, itemOnPress, fetchMore}) => (
  <View style={styles.list}>
    <FlatList
      data={clients}
      keyExtractor={({id}) => `client-${id}`}
      ListEmptyComponent={<Text>Clients list is empty</Text>}
      renderItem={({item: {id, firstName, lastName}}) => (
        <TouchableOpacity
          key={id}
          onPress={() => itemOnPress(id)}
          style={styles.listItem}>
          <Text>
            {firstName} {lastName}
          </Text>
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

ClientsList.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  ),
  itemOnPress: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default ClientsList;
