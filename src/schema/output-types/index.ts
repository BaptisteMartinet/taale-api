import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Op } from 'sequelize';
import { GraphQLDate } from 'core/graphql/scalars';
import { Context } from 'core/context';
import { Sentence, Story, StorySentenceLink } from 'definitions/models';
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
    owner: { type: UserRestrictedType },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

export const StoryType = new GraphQLObjectType<Story, Context>({
  name: 'Story',
  fields: () => ({
    id: { type: GraphQLInt },
    sentences: {
      type: new GraphQLList(SentenceType),
      resolve: async (story) => {
        const sentencesLinks = await StorySentenceLink.findAll({
          where: { storyId: story.id },
          attributes: ['sentenceId'],
        });
        const sentencesIds = sentencesLinks.map(link => link.sentenceId);
        return Sentence.findAll({
          where: { id: { [Op.in]: sentencesIds }},
          include: { association: Sentence.associations.owner, required: true },
        });
      },
    },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});
