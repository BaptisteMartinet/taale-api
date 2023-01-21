import assert from 'assert';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PartialStoryNbSentences } from 'core/constants';
import sequelize from 'core/sequelize';
import ensureModelExistence from 'core/sequelize/ensureModelExistence';
import { expose } from 'core/graphql';
import { Context } from 'core/context';
import { Sentence } from 'definitions/models';
import { SentenceType, UserType } from 'schema/output-types';
import AdminQuery from './admin';

const AuthenticatedQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AuthenticatedQuery',
  fields: {
    admin: expose(AdminQuery, { ensureAdmin: true }),

    account: {
      type: UserType,
      resolve: (source, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        return currentUser;
      },
    },

    partialStory: {
      type: new GraphQLList(SentenceType),
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
          throw new Error('Unable to fetch random sentence within the tree');
        const sentences: Array<Sentence> = [ randomSentence ];
        while (sentences.length < PartialStoryNbSentences) {
          const lastSentence = sentences[sentences.length - 1];
          const { parentSentenceId } = lastSentence;
          if (!parentSentenceId)
            break;
          const parentSentence = await ensureModelExistence(parentSentenceId, Sentence);
          sentences.push(parentSentence);
        }
        return sentences;
      },
    },
  },
});

export default AuthenticatedQuery;
