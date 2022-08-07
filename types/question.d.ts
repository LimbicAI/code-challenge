export type Question = {
  id: string;
  type: string;
  text: string;
};

export type QuestionQueryResult = {
  questions: Question[] ;
};
