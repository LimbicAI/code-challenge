const { gql } = require("apollo-server");

const typeDefs = gql`
  enum QuestionType {
    FreeText
    SingleChoice
    MultipleChoice
  }

  type Question {
    id: ID!
    text: String!
    therapistId: ID!
    type: QuestionType!
  }

  type Answer {
    id: ID!
    clientId: ID!
    questionId: ID!
    text: String
  }

  type Therapist {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    answers: [Answer]
  }

  type Query {
    question(id: ID!): Question
    questions(therapistId: ID!): [Question]
    answer(id: ID!): Answer
    answers(clientId: ID!): [Answer]
    client(id: ID!): Client
    clients: [Client]
    therapist(id: ID!): Therapist
    therapists: [Therapist]
  }

  type Mutation {
    createQuestion(therapistId: ID!, text: String!): Question
    updateQuestion(id: ID!, text: String!): Question
    deleteQuestion(id: ID!): Question

    createAnswer(questionId: ID!, clientId: ID!, text: String!): Answer
    updateAnswer(id: ID!, text: String!): Answer
    deleteAnswer(id: ID!): Answer

    createTherapist(
      firstName: String!
      lastName: String!
      email: String!
    ): Therapist
    updateTherapist(
      id: ID!
      firstName: String
      lastName: String
      email: String
    ): Therapist
    deleteTherapist(id: ID!): Therapist

    createClient(firstName: String!, lastName: String!, email: String!): Client
    updateClient(
      id: ID!
      firstName: String
      lastName: String
      email: String
    ): Client
    deleteClient(id: ID!): Client
  }
`;

module.exports = typeDefs;
