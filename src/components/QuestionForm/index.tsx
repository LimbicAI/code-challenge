import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Card, Grid, Button, Typography } from '@material-ui/core';
import { Question } from '../../types/Question';

const initialQuestions: Question[] = [];
const QuestionForm = ({ trigger, setTrigger }: any) => {
  const [questions, setQuestions] = useState([{}]);
  const question = {
    id: '',
    question: ''
  };

  const addQuestion = (question: Question) => {
    const getQuestions: Question[] = JSON.parse(
      localStorage.getItem('questions')!
    );
    if (getQuestions) {
      getQuestions.push(question);
      localStorage.setItem('questions', JSON.stringify(getQuestions));
    } else {
      initialQuestions.push(question);
      setQuestions(initialQuestions);
      const questionsToString = JSON.stringify(initialQuestions);
      localStorage.setItem('questions', questionsToString);
    }
    setTrigger(!trigger);
  };

  return (
    <Card>
      <Formik
        initialValues={question}
        validationSchema={Yup.object().shape({
          question: Yup.string().required('please enter a question')
        })}
        onSubmit={(values, { resetForm }) => {
          const newQuestion = {
            id: Math.floor(Math.random() * 100),
            question: values.question
          };

          addQuestion(newQuestion);
          resetForm({});
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid
              container
              direction="column"
              spacing={3}
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              <Grid>
                <Typography>Please enter a Question</Typography>
              </Grid>
              <Grid item>
                <TextField
                  className="w-45 mt-2 mr-2"
                  style={{ width: '80%' }}
                  id="question"
                  label="Question"
                  name="question"
                  variant="outlined"
                  value={values.question}
                  onChange={handleChange}
                  error={touched.question && Boolean(errors.question)}
                  helperText={touched.question && errors.question}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>

              <Grid container justify="center" className="pb-3">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    className="m-1 btn-primary"
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default QuestionForm;
