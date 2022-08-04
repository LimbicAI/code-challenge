import { Question, QuestionType } from '../../types/questions';

export const defaultQuestion: Question = {
  type: QuestionType.FreeText,
  title: 'New Question',
  description: '',
  id: '',
};

export const defaultChoiceQuestion: Question = {
  ...defaultQuestion,
  type: QuestionType.Radiobutton,
  options: [{ title: 'Option 1' }, { title: 'Option 2' }],
};
