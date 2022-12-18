import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});
