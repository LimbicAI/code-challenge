export type Answer = {
  id: string;
  question_id: string;
  answer: string;
};

export type AnswerQueryResult = {
  answers: Answer[] ;
};
