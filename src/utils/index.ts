import { Question, QuestionType } from 'types/questions';

import { authKey } from './constants';

export const isOptionsQuestion = (question: Question) =>
  [QuestionType.Radiobutton, QuestionType.Checkbox].includes(question.type);

export const pluralize = (word: string, amount: number) =>
  `${word}${amount > 1 || amount === 0 ? 's' : ''}`;

export const getAuthType = () => localStorage.getItem(authKey);
