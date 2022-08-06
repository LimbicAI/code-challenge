import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Table from '../../ui/table';
import { DELETE_QUESTION } from '../form/query';
import { GET_QUESTIONS } from './query';
import Button from '../../ui/button';

export default function QuestionsList() {
  const router = useRouter();
  const {
    data: { questions } = [], loading, error, refetch,
  } = useQuery(GET_QUESTIONS);

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    console.error(error);
    return 'error....';
  }

  const handleEdit = (row) => {
    console.log('row', row);
    router.push(`/questions/${row.id}`);
  };

  const handleRemove = (row) => {
    deleteQuestion({ variables: { id: row.id } });
    refetch();
  };

  const prepareData = (rawQuestions) => rawQuestions.map((q, index) => ({
    number: index + 1, ...q,
  }));

  const handleAdd = () => {
    router.push('/questions/new');
  };

  const preparedData = prepareData(questions);
  const headers = ['#', 'Type', 'Text'];
  const visibleKeys = ['number', 'type', 'text'];

  return (
    <>
      <Button type="button" text="Add Question" onClick={handleAdd} />

      <Table
        headers={headers}
        keys={visibleKeys}
        data={preparedData}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
      />
    </>
  );
}
