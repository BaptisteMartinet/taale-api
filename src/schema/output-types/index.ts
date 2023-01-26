import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLDate } from 'core/graphql/scalars';
import { RoleEnum, LocaleEnum } from 'definitions/enums';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: RoleEnum },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

export const UserRestrictedType = new GraphQLObjectType({
  name: 'UserRestricted',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
  }),
});

export const TreeType = new GraphQLObjectType({
  name: 'Tree',
  fields: () => ({
    id: { type: GraphQLInt },
    open: { type: GraphQLBoolean },
    locale: { type: LocaleEnum },
    owner: { type: UserRestrictedType },
    sentences: { type: new GraphQLList(SentenceType) },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

export const SentenceType = new GraphQLObjectType({
  name: 'Sentence',
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

export const StoryType = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: { type: GraphQLInt },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});
