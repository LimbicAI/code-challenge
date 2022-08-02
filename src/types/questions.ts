export enum QuestionType {
  FreeText = 0,
  Number,
  Radiobutton,
  Checkbox,
}

export interface Option {
  title: string;
}

export interface Question {
  type: QuestionType;
  options?: Option[];
  id?: string;
  title: string;
  description?: string;
}

export type Questionnaire = Question[];

export interface QuestionFormValues {
  questions: Question[];
}
