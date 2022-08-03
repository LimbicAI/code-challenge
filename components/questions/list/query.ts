import { gql } from '@apollo/client';

const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      type
      text
      created_at
      updated_at
    }
  }
`;

export default GET_QUESTIONS;
