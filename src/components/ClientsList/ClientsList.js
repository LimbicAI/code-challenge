import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppState';
import styles from './styles.module.scss';

const QuestionsList = () => {
  const { clients } = useContext(AppContext);
  const [showQuestions, setShowQuestions] = useState(
    clients.map(() => false)
  );

  return (
    <div className={styles.questions}>
      {clients.map((client, index) => (
        <React.Fragment key={`${client.name}_${index}`}>
          <button
            className={clsx(styles.client, {
              [styles.expanded]: showQuestions[index]
            })}
            onClick={() => {
              const updatedShowQuestions = clients.map(
                () => false
              );
              updatedShowQuestions[index] = !showQuestions[index];
              setShowQuestions(updatedShowQuestions);
            }}
          >
            {client.name}
          </button>
          {showQuestions[index] && (
            <div
              className={clsx(styles.clientQuestions, {
                [styles.showQuestions]: showQuestions[index]
              })}
            >
              {client.questions.map(question => (
                <div
                  className={styles.questionsAnswers}
                  key={client.name + question.q}
                >
                  <div>
                    <span className={styles.label}>Q:</span>
                    {question.q}
                  </div>
                  <div
                    className={clsx({
                      [styles.answerText]:
                        typeof question.a === 'string',
                      [styles.answerChoices]:
                        typeof question.a !== 'string'
                    })}
                  >
                    <span className={styles.label}>A:</span>
                    {typeof question.a !== 'string' ? (
                      <ul className={styles.list}>
                        {question.a.map(choice => (
                          <li
                            key={`${choice}_${client.name}`}
                          >
                            {choice}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      question.a
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuestionsList;
