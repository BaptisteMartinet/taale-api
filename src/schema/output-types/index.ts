import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLDate, GraphQLNonNullList } from 'lib/graphql';
import { Context } from 'core/context';
import { Sentence, Story } from 'definitions/models';
import { RoleEnum, LocaleEnum } from 'definitions/enums';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(RoleEnum) },
    createdAt: { type: new GraphQLNonNull(GraphQLDate) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDate) },
  }),
});

export const UserRestrictedType = new GraphQLObjectType({
  name: 'UserRestricted',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    username: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const TreeType = new GraphQLObjectType({
  name: 'Tree',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    open: { type: new GraphQLNonNull(GraphQLBoolean) },
    locale: { type: new GraphQLNonNull(LocaleEnum) },
    owner: { type: UserRestrictedType },
    sentences: { type: new GraphQLNonNullList(SentenceType) },
    createdAt: { type: new GraphQLNonNull(GraphQLDate) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDate) },
  }),
});

export const SentenceType = new GraphQLObjectType({
  name: 'Sentence',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    parentSentenceId: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: { type: new GraphQLNonNull(GraphQLDate) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDate) },
    owner: { type: UserRestrictedType },
  }),
});

export const StoryType = new GraphQLObjectType<Story, Context>({
  name: 'Story',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    sentences: {
      type: new GraphQLNonNullList(SentenceType),
      resolve: async (story) => {
        return Sentence.findAll({
          include: [
            {
              association: Sentence.associations.storiesLinks,
              where: { storyId: story.id },
              required: true,
            },
            {
              association: Sentence.associations.owner,
            },
          ],
        });
      },
    },
    createdAt: { type: new GraphQLNonNull(GraphQLDate) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDate) },
  }),
});
