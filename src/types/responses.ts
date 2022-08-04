import { Question } from './questions';

export interface UserResponse extends Question {
  userValue: string | string[];
}

export interface QuestionnaireResponse {
  responses: UserResponse[];
  date: string;
  id: string;
}

export interface Responses {
  [name: string]: QuestionnaireResponse[];
}
