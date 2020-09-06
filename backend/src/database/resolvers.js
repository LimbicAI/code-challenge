const { Question, Answer, User } = require("./schema");

// Question
const getQuestionsByTherapist = (therapistId) =>
  Question.find({ therapistId }).exec();
const getQuestions = () => Question.find().exec();
const getQuestion = (id) => Question.findOne({ id }).exec();
const createQuestion = (args) => new Question(args).save();
const updateQuestion = ({ id, ...args }) =>
  Question.findOneAndUpdate({ id }, { $set: args });
const deleteQuestion = (id) => Question.deleteOne({ id });

// Answer
const getAnswersByClient = (clientId) => Answer.find({ clientId }).exec();
const getAnswers = () => Answer.find().exec();
const getAnswer = (id) => Answer.findOne({ id }).exec();
const createAnswer = (args) => new Answer(args).save();
const updateAnswer = ({ id, ...args }) =>
  Answer.findOneAndUpdate({ id }, { $set: args });
const deleteAnswer = (id) => Answer.deleteOne({ id });

// User
const getUsers = () => User.find().exec();
const getUser = (id) => User.findOne({ id }).exec();
const createUser = (args) => new User(args).save();
const updateUser = ({ id, ...args }) =>
  User.findOneAndUpdate({ id }, { $set: args });
const deleteUser = (id) => User.deleteOne({ id });

// Therapist
const getTherapists = () => User.find({ isTherapist: true }).exec();
const getTherapist = getUser;
const createTherapist = (args) => createUser({ ...args, isTherapist: true });
const updateTherapist = updateUser;
const deleteTherapist = deleteUser;

// Client
const getClients = () => User.find({ isTherapist: false }).exec();
const getClient = getUser;
const createClient = (args) => createUser({ ...args, isTherapist: false });
const updateClient = updateUser;
const deleteClient = deleteUser;

module.exports = {
  getQuestionsByTherapist,
  getQuestions,
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
};
