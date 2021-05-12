import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import sortByName from '../../helpers/sorting';
import { AppContext } from '../../context/AppState';
import clsx from 'clsx';
import Button from '../Button';
import styles from './styles.module.scss';

const Questionnaire = ({ onClick }) => {
  const { clients, questions, updateAnswers } = useContext(AppContext);
  const sortedClientQuestions = sortByName(clients[0].questions, 'q');
  const sortedQuestions = sortByName(questions, 'description');

  let parsedClientQuestions = {};
  for (let i = 0; i < sortedClientQuestions.length; i++) {
    parsedClientQuestions[`input${i}`] = sortedClientQuestions[i].a;
  }
  const [answers, setAnswers] = useState(parsedClientQuestions);

  const handleChange = event => {
    if (event.target.type === 'checkbox') {
      const currentAnswers = Object.assign(answers[event.target.name]);
      const index = currentAnswers.indexOf(event.target.value);
      if (index > -1) {
        currentAnswers.splice(index, 1);
      } else {
        currentAnswers.push(event.target.value);
      }
      setAnswers({
        ...answers,
        [event.target.name]: currentAnswers
      });
    } else {
      setAnswers({
        ...answers,
        [event.target.name]: event.target.value
      });
    }
  };

  const renderChoices = (type, choices, index) => {
    const options = choices.split(',').map(choice => choice.trim());
    return options.map(option => (
      <span key={`${type}_${option}`}>
        <input
          onChange={handleChange}
          type={type === 'multipleChoice' ? 'checkbox' : 'radio'}
          id={option}
          name={`input${index}`}
          value={option}
          checked={answers[`input${index}`].includes(option)}
        />
        <label htmlFor="male">{option}</label>
      </span>
    ));
  };

  return (
    <div className={styles.modal}>
      <form className={styles.form}>
        <h2 className={styles.title}>Welcome Back Andy!</h2>
        <p>Please make any necessary changes and press Done.</p>
        <div className={clsx(styles.section, styles.question)}>
          {sortedQuestions.map((question, index) => {
            return question.type === 'text' ? (
              <div
                className={styles.group}
                key={`textQuestion-${index}`}
              >
                <label>{question.description}</label>
                <input
                  name={`input${index}`}
                  onChange={handleChange}
                  className={styles.input}
                  value={answers[`input${index}`]}
                />
              </div>
            ) : (
              <div
                className={styles.group}
                key={`choiceQuestion-${index}`}
              >
                <label>{question.description}</label>
                {renderChoices(
                  question.type,
                  question.choices,
                  index
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              updateAnswers(clients[0], answers, sortedQuestions);
              onClick();
            }}
          >
            Done
          </Button>
        </div>
      </form>
    </div>
  );
};

Questionnaire.propTypes = {
  onClick: PropTypes.func
};

export default Questionnaire;
