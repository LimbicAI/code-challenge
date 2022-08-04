import { Question } from '../types/questions';
import useApi from '../utils/useApi';

const useQuestions = () => {
  const { data, ...rest } = useApi<Question[]>('questions');

  return {
    questions: data || [],
    ...rest,
  };
};

export default useQuestions;
