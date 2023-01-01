import assert from 'assert';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Op } from 'sequelize';
import { Context } from 'core/context';
import { Minute } from 'core/utils/time';
import ensureModelExistence from 'core/sequelize/ensureModelExistence';
import { Sentence, Report } from 'definitions/models';
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
        const nbSentencesInLast5Mins = await Sentence.count({
          where: {
            ownerId: currentUser.id,
            createdAt: { [Op.gte]: (Date.now() - (Minute * 5)) },
          },
        });
        if (nbSentencesInLast5Mins >= 3)
          throw new Error('Spam detected');
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

    report: {
      type: GraphQLBoolean,
      resolve: async (source, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        if (!(source instanceof Sentence))
          return false;
        await Report.create({
          ownerId: currentUser.id,
          resourceType: Sentence.name,
          resourceId: source.id,
        });
        // TODO do something if resource is reported too much (delete?)
        return true;
      },
    },
  },
});

export default SentenceMutation;
