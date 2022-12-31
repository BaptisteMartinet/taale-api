import assert from 'assert';
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context } from 'core/context';
import ensureModelExistence from 'core/sequelize/ensureModelExistence';
import { Sentence } from 'definitions/models';
import { SentenceType } from 'schema/output-types';

const SentenceMutation = new GraphQLObjectType<unknown, Context>({
  name: 'SentenceMutation',
  fields: {
    create: {
      type: SentenceType,
      args: {
        parentSentenceId: { type: new GraphQLNonNull(GraphQLInt) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (source, args, ctx) => {
        const { parentSentenceId, text } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        const parentSentence = await ensureModelExistence(parentSentenceId, Sentence);
        const parentSentenceStoryId = parentSentence.storyId;
        const sentence = await Sentence.create({
          ownerId: currentUser.id,
          storyId: parentSentenceStoryId,
          parentSentenceId,
          text,
        });
        return sentence;
      },
    },
    // update
    // delete
  },
});

export default SentenceMutation;
