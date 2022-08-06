import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import QuestionsList from '../../components/questions/list/list';
import { QuestionQueryResult } from '../../types/question';
import { GET_QUESTIONS } from '../../components/questions/list/query';

export default function Questions():NextPage {
  const {
    data, loading, error, refetch,
  } = useQuery<QuestionQueryResult>(GET_QUESTIONS);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    console.error(error);
    return 'error....';
  }

  const questions = data?.questions || [];
  return <QuestionsList questions={questions} refetch={refetch} />;
}
