import assert from 'assert';
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context } from 'core/context';
import { Sentence, Story } from 'definitions/models';
import { SentenceType } from 'schema/output-types';

const SentenceMutation = new GraphQLObjectType<unknown, Context>({
  name: 'SentenceMutation',
  fields: {
    create: {
      type: SentenceType,
      args: {
        storyId: { type: new GraphQLNonNull(GraphQLInt) },
        parentSentenceId: { type: new GraphQLNonNull(GraphQLInt) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (source, args, ctx) => {
        const { storyId, parentSentenceId, text } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        if (!(await Story.findByPk(storyId)))
          throw new Error(`Story#${storyId} does not exist`);
        if (!(await Sentence.findByPk(parentSentenceId)))
          throw new Error(`Sentence#${parentSentenceId} does not exist`);
        const sentence = await Sentence.create({
          ownerId: currentUser.id,
          storyId,
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
