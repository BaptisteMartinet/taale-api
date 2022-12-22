import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

const AuthenticatedQuery = new GraphQLObjectType({
  name: 'AuthenticatedQuery',
  fields: {
    test: {
      type: GraphQLBoolean,
    },
  },
});

export default AuthenticatedQuery;
