export const prepareDefaultValues = (answers) => {
  const defaultValues = {};
  answers.forEach((answer) => {
    defaultValues[`q_${answer.question_id}`] = answer.answer;
  });
  return defaultValues;
};
