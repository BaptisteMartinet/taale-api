import assert from 'assert';
import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Op } from 'sequelize';
import { GraphQLNonNullList } from 'lib/graphql';
import { PartialStoryNbSentences } from 'core/constants';
import sequelize from 'core/sequelize';
import { expose } from 'core/graphql';
import { Context } from 'core/context';
import { Sentence, Story, StorySentenceLink } from 'definitions/models';
import { ascendSentencesIdsWithLimit } from 'definitions/helpers';
import { SentenceType, UserType, StoryType } from 'schema/output-types';
import AdminQuery from './admin';
import StatisticsQuery from './statistics';

const AuthenticatedQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AuthenticatedQuery',
  fields: {
    admin: expose(AdminQuery, { ensureAdmin: true }),
    statistics: expose(StatisticsQuery),

    account: {
      type: UserType,
      resolve: (source, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        return currentUser;
      },
    },

    partialStory: {
      type: new GraphQLNonNullList(SentenceType),
      resolve: async (source, args, ctx) => {
        const { locale } = ctx;
        const randomSentence = await Sentence.findOne({
          include: {
            association: Sentence.associations.tree,
            required: true,
            where: { locale },
          },
          where: { theEnd: false },
          order: sequelize.random(),
        });
        if (!randomSentence)
          throw new Error('Unable to fetch random sentence within the trees');
        const sentencesIds = await ascendSentencesIdsWithLimit(randomSentence.id, PartialStoryNbSentences);
        return Sentence.findAll({
          where: { id: { [Op.in]: sentencesIds } },
          include: { association: Sentence.associations.owner },
        });
      },
    },

    myStories: {
      type: new GraphQLNonNull(new GraphQLNonNullList(StoryType)),
      resolve(source, args, ctx) {
        const { currentUser } = ctx;
        assert(currentUser);
        return Story.findAll({
          include: [{
            model: StorySentenceLink,
            as: 'sentencesLinks',
            required: true,
            include: [{
              model: Sentence,
              as: 'sentence',
              where: { ownerId: currentUser.id },
              required: true,
            }],
          }],
        });
      },
    },
  },
});

export default AuthenticatedQuery;
