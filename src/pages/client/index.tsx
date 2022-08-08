import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';
import { Question } from '../../types/Question';
import useStyles from './styles';

const Client = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const questionsAsString: any = localStorage.getItem('questions');
    const listOfQuestions = JSON.parse(questionsAsString);
    setQuestions(listOfQuestions);
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6">Here are some questions from your Therapist</Typography>
      {questions.map((question :  Question) => (
        <QuestionCard question={question} />
      ))}
    </div>
  );
};

export default Client;
