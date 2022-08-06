import { gql } from '@apollo/client';

export const GET_ANSWERS = gql`
  query GetAnswers {
    questions {
      id
      type
      text
    }
    answers {
      id
      question_id
      answer
    }
  }
`;

export const INSERT_ANSWER = gql`
  mutation InsertAnswer($answers: [answers_insert_input!]!) {
    insert_answers(objects: $answers) {
      affected_rows
    }
  }
`;
