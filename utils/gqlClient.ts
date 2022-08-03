import { GraphQLClient } from 'graphql-request';

const gqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': process.env.GRAPHQL_SECRET,
    'content-type': 'application/json',
  },
});

const gqlRequest = async (
  query: string,
  variables,
): Promise<any> => {
  const val = await gqlClient.request(query, variables).catch((error) => {
    console.error('❌error in executing gql statement❌', error);
  });
  return val;
};

export default gqlRequest;
