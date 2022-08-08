import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  CardActions,
  CardContent,
  Button,
  TextField,
  Card
} from '@material-ui/core';
import useStyles from './styles';
import { Answer } from '../../types/Answer';

const QuestionCard = ({ question, user }: any) => {
  const textInput = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const [answer, setAnswer] = useState<string>('');
  const clientAnswers: Answer[] = [];

  const handleChange = (e: any) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (answer !== '') {
      const myAnswer: Answer = {
        id: Math.floor(Math.random() * 100),
        userName: user.name,
        questionId: question.id,
        question: question.question,
        answer: answer
      };
      clientAnswers.push(myAnswer);
      const currentAnswers = localStorage.getItem('answers');
      const currentAnswerArray: Answer[] = JSON.parse(currentAnswers!);

      if (currentAnswerArray) {
        currentAnswerArray.push(myAnswer);
        localStorage.setItem('answers', JSON.stringify(currentAnswerArray));
      } else {
        localStorage.setItem('answers', JSON.stringify(clientAnswers));
      }
      if (textInput.current != null) {
        textInput.current.value = '';
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2">
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
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
