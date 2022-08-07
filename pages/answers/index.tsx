import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import AnswerForm from '../../components/answers/form/form';
import { GET_ANSWERS } from '../../components/answers/form/query';

export default function Answers():NextPage {
  const {
    data: { questions, answers } = [], loading, error,
  } = useQuery(GET_ANSWERS);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    console.error(error);
    return 'error....';
  }

  return (
    <AnswerForm answers={answers} questions={questions} />
  );
}
