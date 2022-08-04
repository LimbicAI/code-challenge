import { useQuery } from '@apollo/client';
import GET_QUESTIONS from './query';
import Table from '../../ui/table';

export default function QuestionsList() {
  const { data: { questions } = [], loading, error } = useQuery(GET_QUESTIONS);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    console.error(error);
    return 'error....';
  }
  console.log('data222222', questions);

  const handleEdit = (row) => {
    console.log('row', row);
  };

  const columns = ['#', 'Type', 'Text'];
  return (
    <Table columns={columns} data={questions} handleEdit={handleEdit} />
  );
}
