import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDate } from 'core/graphql/scalars';
import { RoleEnum } from 'definitions/enums';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: RoleEnum },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  },
});

export const StoryType = new GraphQLObjectType({
  name: 'Story',
  fields: {
    id: { type: GraphQLInt },
    open: { type: GraphQLBoolean },
    owner: { type: UserType },
  },
});
