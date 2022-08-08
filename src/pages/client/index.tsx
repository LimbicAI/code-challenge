import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';
import { Question } from '../../types/Question';
import useStyles from './styles';
import { User } from '../../types/User';

const Client = () => {
  const [user, setUser] = useState<User>();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsAsString: any = localStorage.getItem('questions');
    const listOfQuestions = JSON.parse(questionsAsString);
    setQuestions(listOfQuestions);
    const userString = sessionStorage.getItem('user');
    const signedInUser: User = JSON.parse(userString!);
    setUser(signedInUser);
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Hi, {user?.name}, here are some questions from your therapist
      </Typography>
      {questions.map((question: Question) => (
        <QuestionCard question={question} user={user} />
      ))}
    </div>
  );
};

export default Client;
