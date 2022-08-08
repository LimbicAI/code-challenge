import React, { useState, useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Toolbar,
  Typography,
  CardActions,
  CardContent,
  Button,
  TextField,
  Card
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { Answer } from '../../types/Answer';
import { Question } from '../../types/Question';
import { User } from '../../types/User';

const QuestionCard = ({ question }: any) => {
  const textInput = useRef(null);
  const classes = useStyles();
  const [answer, setAnswer] = useState();
  const [answers, setAnswers] = useState();
  const clientAnswers: Answer[] = [];

  const userString = sessionStorage.getItem('user');

  const user: User = JSON.parse(userString!);
  console.log('user', user);

  const handleChange = (e: any) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const myAnswer: Answer = {
      id: Math.floor(Math.random() * 100),
      userName: user.name,
      questionId: question.id,
      question: question.question,
      answer: answer
    };
    clientAnswers.push(myAnswer);
    console.log('answer', myAnswer);

    //check if there are existing Answers
    const currentAnswers = localStorage.getItem('answers');
    const currentAnswerArray: Answer[] = JSON.parse(currentAnswers!);

    if (currentAnswerArray) {
      currentAnswerArray.push(myAnswer);
      localStorage.setItem('answers', JSON.stringify(currentAnswerArray));
    } else {
      localStorage.setItem('answers', JSON.stringify(clientAnswers));
    }
    //if yes update the array by adding the new answers
    //if no just set the answer to storage
  };
  console.log('question', question);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {question?.question}
        </Typography>
        <TextField
          name="answer"
          onChange={handleChange}
          variant="outlined"
          inputRef={textInput}
          required
          fullWidth
          label="Answer"
          autoFocus
          InputProps={{}}
        />
        <Typography variant="body2" component="p"></Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button} size="small" onClick={handleSubmit}>
          Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
