const { GraphQLFormattedError } = require("graphql");

const formatError = (error) => {
  console.error(error);
  const { extensions: { code } = { code: null } } = error;
  const extensions = code ? { code } : {};
  const formatedError = { ...error, extensions };

  return formatedError;
};

module.exports = formatError;
