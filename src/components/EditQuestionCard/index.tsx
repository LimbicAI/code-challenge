import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Card, Grid, Button, Typography } from '@material-ui/core';
import { Question } from '../../types/Question';

const EditQuestionCard = ({
  question,
  handleCloseModal,
  trigger,
  setTrigger
}: any) => {
  const editQuestion = (editedQuestion: Question) => {
    const getQuestions: Question[] = JSON.parse(
      localStorage.getItem('questions')!
    );
    const editedQuestions: Question[] = getQuestions.filter(
      (item) => item.id !== editedQuestion.id
    );
    editedQuestions.push(editedQuestion);
    localStorage.setItem('questions', JSON.stringify(editedQuestions));
    handleCloseModal();
    setTrigger(!trigger);
  };

  return (
    <Card>
      <Formik
        initialValues={question}
        validationSchema={Yup.object().shape({
          question: Yup.string().required('question cannot be empty')
        })}
        onSubmit={(values, { resetForm }) => {
          const editedQuestion: Question = {
            id: question.id,
            question: values.question
          };

          editQuestion(editedQuestion);
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
              style={{ margin: '20px', marginBottom: '10px' }}
            >
              <Grid justify="center">
                <Typography>Edit Question</Typography>
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
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>

              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    className="m-1 btn-secondary"
                  >
                    Edit
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

export default EditQuestionCard;
