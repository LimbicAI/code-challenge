import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal, Box } from '@material-ui/core';
import { Question } from '../../types/Question';
import EditQuestionCard from '../EditQuestionCard';

const initialQuestion: Question = { id: 0, question: '' };
const QuestionTable = ({ trigger, setTrigger }: any) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const questionsAsString: any = localStorage.getItem('questions');
    const listOfQuestions = JSON.parse(questionsAsString);
    setQuestions(listOfQuestions);
  }, [trigger]);

  const handleEdit = (selectedQuestion: Question) => {
    setQuestion(selectedQuestion);
    setOpenModal(true);
    setAnchorEl(null);
  };

  const handleDelete = (
    question: Question,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const filterQuestions: Question[] = questions.filter(
      (item: Question) => item.id !== question.id
    );
    const questionsToString = JSON.stringify(filterQuestions);
    localStorage.setItem('questions', questionsToString);
    setTrigger(!trigger);
  };

  const EnhancedTableToolbar = () => {
    return (
      <Toolbar style={{ paddingLeft: 12 }}>
        <Typography variant="h5" id="tableTitle" component="h1">
          Questions
        </Typography>
      </Toolbar>
    );
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Box>
          <EditQuestionCard
            question={question}
            handleCloseModal={handleCloseModal}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        </Box>
      </Modal>
      <EnhancedTableToolbar />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: '#F0F4FF' }}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions?.map((question: any) => (
              <TableRow key={question?.id}>
                <TableCell> {question?.question} </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(question)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={(event) => handleDelete(question, event)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuestionTable;
