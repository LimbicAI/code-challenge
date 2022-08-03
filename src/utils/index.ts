import { Question, QuestionType } from 'types/questions';

export const isOptionsQuestion = (question: Question) =>
  [QuestionType.Radiobutton, QuestionType.Checkbox].includes(question.type);
