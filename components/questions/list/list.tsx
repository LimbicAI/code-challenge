import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Table from '../../ui/table';
import { DELETE_QUESTION } from '../form/query';
import Button from '../../ui/button';
import { Question } from '../../../types/question';

interface QuestionListProps {
  questions: Question[];
  refetch: () => void;
}

export default function QuestionsList({ questions, refetch }: QuestionListProps) {
  const router = useRouter();

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const handleEdit = (row) => {
    router.push(`/questions/${row.id}`);
  };

  const handleRemove = (row) => {
    deleteQuestion({ variables: { id: row.id } }).then(() => {
      refetch();
    });
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
