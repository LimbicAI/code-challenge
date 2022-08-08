import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import QuestionForm from '../../components/QuestionForm';
import QuestionTable from '../../components/QuestionTable';
import AnswerTable from '../../components/AnswerTable';
import ClientsTable from '../../components/ClientsTable';

const Therapist = () => {
  const classes = useStyles();
  const [trigger, setTrigger] = useState(false);
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <QuestionForm trigger={trigger} setTrigger={setTrigger} />
      </Grid>
      <Grid item>
        <QuestionTable trigger={trigger} setTrigger={setTrigger} />
      </Grid>
      <Grid item>
        <ClientsTable />
      </Grid>
      <Grid item>
        <AnswerTable />
      </Grid>
    </Grid>
  );
};

export default Therapist;
