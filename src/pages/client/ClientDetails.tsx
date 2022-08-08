import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Answer } from '../../types/Answer';

const ClientDetails = () => {
  const location = useLocation();
  const history = useHistory();
  const { user }: any = location.state;
  const [answers, setAnswers] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const answersAsString: any = localStorage.getItem('answers');
    const listOfAnswers = JSON.parse(answersAsString);
    setAnswers(listOfAnswers);
  }, []);

  const filteredAnswers: Answer[] = answers.filter(
    (answer: Answer) => answer.userName === user?.name
  );

  const backToDashboard = () => {
    history.push('/therapist');
  };

  const EnhancedTableToolbar = () => {
    return (
      <Toolbar style={{ paddingLeft: 12 }}>
        <Typography variant="h4" id="tableTitle" component="h1">
          Here is a list of {user?.name}'s answers
        </Typography>
      </Toolbar>
    );
  };
  return (
    <div className={classes.root}>
      <EnhancedTableToolbar />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: '#F0F4FF' }}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnswers?.map((answer: Answer) => (
              <TableRow key={answer?.id}>
                <TableCell> {answer?.question} </TableCell>
                <TableCell> {answer?.answer} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={backToDashboard}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default ClientDetails;
