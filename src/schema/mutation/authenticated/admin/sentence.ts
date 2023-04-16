import type { Context } from 'core/context';

import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ensureModelExistence } from 'core/sequelize';
import { Sentence } from 'definitions/models';
import { createStory } from 'definitions/helpers';

export default new GraphQLObjectType<unknown, Context>({
  name: 'AdminSentenceMutation',
  fields: {
    markSentenceCompleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        sentenceId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(source, args, ctx) {
        const { sentenceId } = args;
        const sentence = await ensureModelExistence(sentenceId, Sentence);
        await createStory(sentence);
        return true;
      },
    },
  },
});
