import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const AnswerForm = ({id = null, questionText, text = '', onSubmit}) => {
  const [answerText, setAnswerText] = useState(text);

  const submitForm = () =>
    onSubmit({
      id,
      answerText,
    });

  return (
    <View style={styles.form}>
      <Text style={styles.questionText}>{questionText}</Text>
      <TextInput
        onChangeText={(inputText) => setAnswerText(inputText)}
        value={answerText}
        placeholder="Please add an answer"
        onSubmitEditing={answerText ? submitForm : undefined}
      />
      <Button title="Submit" disabled={!answerText} onPress={submitForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 5,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: '600',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

AnswerForm.proptypes = {
  id: PropTypes.string,
  questionText: PropTypes.string.isRequired,
  text: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
