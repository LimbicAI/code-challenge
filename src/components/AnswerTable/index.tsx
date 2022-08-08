import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';


const AnswerTable = () => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const answersAsString: any = localStorage.getItem('answers');
    console.log('answers', answersAsString);
    const listOfAnswers = JSON.parse(answersAsString);
    setAnswers(listOfAnswers);
  }, []);

  const EnhancedTableToolbar = () => {
    return (
      <Toolbar style={{ paddingLeft: 12 }}>
        <Typography variant="h4" id="tableTitle" component="h1">
          Answers
        </Typography>
      </Toolbar>
    );
  };
  return (
    <div>
      <EnhancedTableToolbar />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: '#F0F4FF' }}>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers?.map((answer: any) => (
              <TableRow key={answer?.id}>
                <TableCell> {answer?.userName} </TableCell>
                <TableCell> {answer?.question} </TableCell>
                <TableCell> {answer?.answer} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnswerTable;
