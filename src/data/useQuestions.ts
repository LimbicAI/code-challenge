import { Question } from '../types/questions';
import useApi from '../utils/useApi';

const useQuestions = () => useApi<Question[]>('questions');

export default useQuestions;
