const { ApolloError, UserInputError } = require("apollo-server");
const md5 = require("md5");
const { v4: uuidv4 } = require("uuid");

const {
  getQuestionsByTherapist,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,

  getAnswersByClient,
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,

  getTherapists,
  getTherapist,
  createTherapist,
  updateTherapist,
  deleteTherapist,

  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../database/resolvers");

// Questions
const resolverQueryQuestions = (_, { therapistId }) => {
  if (!therapistId) {
    throw new UserInputError("Please specify therapist id");
  }

  return getQuestionsByTherapist(therapistId);
};

const resolverQueryQuestion = (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify question id");
  }

  return getQuestion(id);
};

const resolverMutationCreateQuestion = (_, args) => {
  if (!Object.keys(args).length) {
    throw new UserInputError("No arguments specified");
  }

  const id = md5(uuidv4());

  return createQuestion({ ...args, id });
};

const resolverMutationUpdateQuestion = (_, { id, ...args }) => {
  if (!id) {
    throw new UserInputError("Please specify question id");
  }

  if (!Object.keys({ ...args }).length) {
    throw new UserInputError("No arguments specified");
  }

  return updateQuestion({ id, ...args });
};

const resolverMutationDeleteQuestion = async (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify question id");
  }

  try {
    const deleted = await deleteQuestion(id);

    return {
      id
    };
  } catch(e) {
    throw new ApolloError(`Error deleting question ${id}`);
  }
};

// Answers
const resolverQueryAnswers = (_, { clientId }) => {
  if (!clientId) {
    throw new UserInputError("Please specify client id");
  }

  return getAnswersByClient(clientId);
};

const resolverQueryAnswer = (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify answer id");
  }

  return getAnswer(id);
};

const resolverMutationCreateAnswer = (_, args) => {
  if (!Object.keys(args).length) {
    throw new UserInputError("No arguments specified");
  }

  const id = md5(uuidv4());

  return createAnswer({ ...args, id });
};

const resolverMutationUpdateAnswer = (_, { id, ...args }) => {
  if (!id) {
    throw new UserInputError("Please specify answer id");
  }

  if (!Object.keys({ ...args }).length) {
    throw new UserInputError("No arguments specified");
  }

  return updateAnswer({ id, ...args });
};

const resolverMutationDeleteAnswer = async (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify answer id");
  }

  try {
    const deleted = await deleteAnswer(id);

    return {
      id
    };
  } catch(e) {
    throw new ApolloError(`Error deleting answer ${id}`);
  }
};

// Therapists
const resolverQueryTherapists = () => getTherapists();

const resolverQueryTherapist = (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify therapist id");
  }

  return getTherapist(id);
};

const resolverMutationCreateTherapist = (_, args) => {
  if (!Object.keys(args).length) {
    throw new UserInputError("No arguments specified");
  }

  const id = md5(uuidv4());

  return createTherapist({ ...args, id });
};

const resolverMutationUpdateTherapist = (_, { id, ...args }) => {
  if (!id) {
    throw new UserInputError("Please specify therapist id");
  }

  if (!Object.keys({ ...args }).length) {
    throw new UserInputError("No arguments specified");
  }

  return updateTherapist({ id, ...args });
};

const resolverMutationDeleteTherapist = async (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify therapist id");
  }

  try {
    const deleted = await deleteTherapist(id);

    return {
      id
    };
  } catch(e) {
    throw new ApolloError(`Error deleting therapist ${id}`);
  }
};

// Clients
const resolverQueryClients = () => {
  return getClients();
};

const resolverQueryClient = async (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify client id");
  }

  try {
    const client = await getClient(id);
    const answers = await getAnswersByClient(id);
    
    const parsedClient = JSON.parse(JSON.stringify(client));
    const parsedAnswers = JSON.parse(JSON.stringify(answers));
    
    const clientWithAnswers = {
      ...parsedClient,
      answers: parsedAnswers,
    };

    return clientWithAnswers;
  } catch (e) {
    throw new ApolloError("Something went wrong");
  }
};

const resolverMutationCreateClient = (_, args) => {
  if (!Object.keys(args).length) {
    throw new UserInputError("No arguments specified");
  }

  const id = md5(uuidv4());

  return createClient({ ...args, id });
};

const resolverMutationUpdateClient = (_, { id, ...args }) => {
  if (!id) {
    throw new UserInputError("Please specify client id");
  }

  if (!Object.keys({ ...args }).length) {
    throw new UserInputError("No arguments specified");
  }

  return updateClient({ id, ...args });
};

const resolverMutationDeleteClient = async (_, { id }) => {
  if (!id) {
    throw new UserInputError("Please specify client id");
  }
  
  try {
    const deleted = await deleteClient(id);

    return {
      id
    };
  } catch(e) {
    throw new ApolloError(`Error deleting client ${id}`);
  }
};

// User
const resolverMutationLoginUser = (_, { credentials }) => {
  // TODO
};

module.exports = {
  Query: {
    questions: resolverQueryQuestions,
    question: resolverQueryQuestion,

    answers: resolverQueryAnswers,
    answer: resolverQueryAnswer,

    therapists: resolverQueryTherapists,
    therapist: resolverQueryTherapist,

    clients: resolverQueryClients,
    client: resolverQueryClient,
  },
  Mutation: {
    createQuestion: resolverMutationCreateQuestion,
    updateQuestion: resolverMutationUpdateQuestion,
    deleteQuestion: resolverMutationDeleteQuestion,

    createAnswer: resolverMutationCreateAnswer,
    updateAnswer: resolverMutationUpdateAnswer,
    deleteAnswer: resolverMutationDeleteAnswer,

    createTherapist: resolverMutationCreateTherapist,
    updateTherapist: resolverMutationUpdateTherapist,
    deleteTherapist: resolverMutationDeleteTherapist,

    createClient: resolverMutationCreateClient,
    updateClient: resolverMutationUpdateClient,
    deleteClient: resolverMutationDeleteClient,

    // loginUser: resolverMutationLoginUser
  },
};
