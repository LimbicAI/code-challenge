import { gql } from '@apollo/client';

const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      type
      text
    }
  }
`;

export default GET_QUESTIONS;
