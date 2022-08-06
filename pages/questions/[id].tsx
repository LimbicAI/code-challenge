import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import QuestionsForm from '../../components/questions/form/form';
import { GET_QUESTION } from '../../components/questions/form/query';

export default function Question(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  if (id === 'new') {
    return <QuestionsForm />;
  }

  const { data: { question } = {}, loading, error } = useQuery(GET_QUESTION, { variables: { id } });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    console.error(error);
    return 'error....';
  }

  return (
    <QuestionsForm question={question} />
  );
}
