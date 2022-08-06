import { gql } from '@apollo/client';

export const GET_QUESTION = gql`
query GetQuestion($id: Int!) {
  question: questions_by_pk(id:$id) {
    id
    type
    text
  }
}
`;

export const UPDATE_QUESTION = gql`
mutation UpdateQuestion($id:Int!,$question: questions_set_input) {
  update_questions_by_pk(_set: $question, pk_columns: {id:$id}){
    id
  }
}
`;

export const DELETE_QUESTION = gql`
mutation DeleteQuestion($id:Int!) {
  delete_questions_by_pk(id:$id) {
    id
  }
}
`;

export const INSERT_QUESTION = gql`
mutation InsertQuestion($question: questions_insert_input!) {
  insert_questions(objects: [$question]) {
    returning {
      id
    }
  }
}
`;
