import assert from 'assert';
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context } from 'core/context';
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
        const parentSentence = await Sentence.findByPk(parentSentenceId);
        if (!parentSentence)
          throw new Error(`Parent Sentence#${parentSentenceId} does not exist`);
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
