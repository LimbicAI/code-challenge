import { v4 } from 'uuid';

import { Question, QuestionType } from '../../types/questions';

export const getDefaultQuestion: () => Question = () => ({
  type: QuestionType.FreeText,
  title: 'New Question',
  description: '',
  id: v4(),
});

export const defaultChoiceQuestion: Question = {
  ...getDefaultQuestion(),
  type: QuestionType.Radiobutton,
  options: [{ title: 'Option 1' }, { title: 'Option 2' }],
};
