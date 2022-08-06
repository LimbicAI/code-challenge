import { gql } from '@apollo/client';

export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      type
      text
    }
  }
`;
