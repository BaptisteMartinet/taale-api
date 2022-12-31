import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PartialStoryNbSentences } from 'core/constants';
import sequelize from 'core/sequelize';
import ensureModelExistence from 'core/sequelize/ensureModelExistence';
import { expose } from 'core/graphql';
import { Sentence } from 'definitions/models';
import { SentenceType } from 'schema/output-types';
import AdminQuery from './admin';

const AuthenticatedQuery = new GraphQLObjectType({
  name: 'AuthenticatedQuery',
  fields: {
    admin: expose(AdminQuery, { ensureAdmin: true }),

    partialStory: {
      type: new GraphQLList(SentenceType),
      resolve: async () => {
        const randomSentence = await Sentence.findOne({ order: sequelize.random() });
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
