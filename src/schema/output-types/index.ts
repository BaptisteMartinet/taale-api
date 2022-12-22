import { GraphQLObjectType, GraphQLString } from 'graphql';
import { RoleEnum } from 'definitions/enums';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: RoleEnum },
  },
});
