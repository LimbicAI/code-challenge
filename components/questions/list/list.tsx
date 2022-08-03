import { useQuery } from '@apollo/client';
import GET_QUESTIONS from './query';

export default function QuestionsList() {
  const { data, loading, error } = useQuery(GET_QUESTIONS);
  console.log('data', data);

  // if (loading) {
  //   return 'Loading...';
  // }

  if (error) {
    console.error(error);
    return 'error....';
  }

  console.log('data222222', data);
  return <div> Question list</div>;
}
