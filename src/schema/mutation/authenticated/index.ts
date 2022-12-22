import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

const AuthenticatedMutation = new GraphQLObjectType({
  name: 'AuthenticatedMutation',
  fields: {
    test: {
      type: GraphQLBoolean,
    },
  },
});

export default AuthenticatedMutation;
