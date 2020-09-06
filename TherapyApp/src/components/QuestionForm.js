import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, TextInput, View} from 'react-native';

import {isSentence} from '../utils/text';

const QuestionForm = ({id = null, text = '', onSubmit}) => {
  const [questionText, setQuestionText] = useState(text);

  const submitForm = () =>
    onSubmit({
      id,
      questionText,
    });

  return (
    <View style={styles.form}>
      <TextInput
        onChangeText={(inputText) => setQuestionText(inputText)}
        value={questionText}
        placeholder="Please add a question (min 3 words)"
        onSubmitEditing={isSentence(questionText) ? submitForm : undefined}
      />
      <Button
        title="Submit"
        disabled={!isSentence(questionText)}
        onPress={submitForm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 5,
    marginBottom: 10,
  },
});

QuestionForm.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionForm;
