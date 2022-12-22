import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDate } from 'core/graphql/scalars';
import { RoleEnum } from 'definitions/enums';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: RoleEnum },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  },
});
