import assert from 'assert';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { nbCompletionsToMarkComplete } from 'core/constants';
import { Context } from 'core/context';
import { Minute } from 'core/utils/time';
import { ensureNotSpam, ensureModelExistence } from 'core/sequelize';
import { Sentence, Report, Completion, Story } from 'definitions/models';
import { SentenceType } from 'schema/output-types';

async function checkCompletion(sentence: Sentence) {
  const completionCount = await Completion.count({
    where: { sentenceId: sentence.id },
  });
  if (completionCount < nbCompletionsToMarkComplete)
    return;
  await sentence.update({ theEnd: true });
  await Story.create({
    title: 'The title', // TODO define story title: admin?, first/last sentence?
    sentenceId: sentence.id,
    treeId: sentence.treeId,
  });
}

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
        await ensureNotSpam(Sentence, {
          userId: currentUser.id,
          timeFrameMs: 5 * Minute,
          recordsLimit: 3,
        });
        const parentSentence = await ensureModelExistence<Sentence>(parentSentenceId, Sentence);
        const sentence = await Sentence.create({
          ownerId: currentUser.id,
          treeId: parentSentence.treeId,
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
        assert(source instanceof Sentence);
        if (source.parentSentenceId === null)
          return false;
        if (source.theEnd === true)
          return false;
        await ensureNotSpam(Report, {
          userId: currentUser.id,
          timeFrameMs: 5 * Minute,
          recordsLimit: 3,
        });
        await Report.create({
          ownerId: currentUser.id,
          resourceType: Sentence.name,
          resourceId: source.id,
        });
        // TODO do something if resource is reported too much (delete?) and handle spam
        return true;
      },
    },

    markCompleted: {
      type: GraphQLBoolean,
      resolve: async (source, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        assert(source instanceof Sentence);
        if (source.theEnd === true)
          return false;
        await ensureNotSpam(Completion, {
          userId: currentUser.id,
          timeFrameMs: 5 * Minute,
          recordsLimit: 3,
        });
        await Completion.create({
          ownerId: currentUser.id,
          sentenceId: source.id,
        });
        await checkCompletion(source);
        return true;
      },
    },
  },
});

export default SentenceMutation;
