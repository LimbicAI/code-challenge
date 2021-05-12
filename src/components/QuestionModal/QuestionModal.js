import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import checkIfDisabled from '../../helpers/formChecks';
import { AppContext } from '../../context/AppState';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './styles.module.scss';

const noop = () => {};

const QuestionModal = ({ toggleModal = noop, type = 'create', value }) => {
  const { addQuestion, editQuestion } = useContext(AppContext);
  const [question, setQuestion] = useState(value || '');
  const [answerType, setAnswerType] = useState(value.type || 'text');

  const oldQuestion = value || '';

  const createQuestion = () => {
    addQuestion({ ...question, type: answerType });
    toggleModal(false);
    setQuestion('');
  };

  const updateQuestion = () => {
    editQuestion({
      description: question.description,
      oldDescription: oldQuestion.description,
      type: answerType,
      id: question.id,
      choices: question.choices
    });
    toggleModal(false);
    setQuestion('');
  };

  const onSubmit = event => {
    event.preventDefault();
    if (type === 'create') {
      createQuestion();
    } else {
      updateQuestion();
    }
  };

  const handleSelect = event => {
    event.preventDefault();
    setAnswerType(event.target.value);
  };

  const onChange = event => {
    event.preventDefault();
    const { name } = event.target;
    setQuestion({ ...question, [name]: event.target.value });
  };

  const isSubmitDisabled = checkIfDisabled(question, answerType);

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={event => onSubmit(event)}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="description">
            Question:
          </label>
          <input
            autoFocus
            className={styles.input}
            id="description"
            name="description"
            onChange={onChange}
            type="text"
            value={question.description}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="answerType">
            Answer Type:
          </label>
          <select
            className={styles.input}
            id="answerType"
            name="answerType"
            onChange={handleSelect}
            value={answerType}
          >
            <option value="text">Text</option>
            <option value="singleChoice">Single Choice</option>
            <option value="multipleChoice">Multiple Choice</option>
          </select>
        </div>
        <label className={styles.label} htmlFor="choices">
          Choices (separated by commas):
        </label>
        <input
          className={clsx(styles.input, styles.choices)}
          disabled={answerType === 'text'}
          id="choices"
          name="choices"
          onChange={onChange}
          placeholder="Example: Agree, Somewhat Agree, Disagree"
          type="text"
          value={question.choices}
        />
        <div className={styles.buttons}>
          <Button onClick={() => toggleModal(false)}>Cancel</Button>
          {type === 'create' ? (
            <Button disabled={isSubmitDisabled} type="submit">
              Create
            </Button>
          ) : (
            <Button disabled={isSubmitDisabled} type="submit">
              Update
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

QuestionModal.propTypes = {
  toggleModal: PropTypes.func,
  type: PropTypes.oneOf(['create', 'edit']),
  value: PropTypes.object
};

export default QuestionModal;
