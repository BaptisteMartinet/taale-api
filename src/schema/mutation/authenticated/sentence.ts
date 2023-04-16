import assert from 'assert';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  ensureNotSpam,
  ensureModelExistence,
} from 'core/sequelize';
import {
  SentenceCreationAntiSpamTimeFrameMs,
  SentenceCreationAntiSpamRecordsLimit,
  ReportAntiSpamTimeFrameMs,
  ReportAntiSpamRecordsLimit,
  CompletionAntiSpamTimeFrameMs,
  CompletionAntiSpamRecordsLimit,
  NbReportsToDeleteSentence,
} from 'core/constants';
import { Context } from 'core/context';
import { ClientError } from 'core/errors';
import {
  Sentence,
  Report,
  Completion,
  StorySentenceLink,
} from 'definitions/models';
import {
  ensureSentenceText,
  checkCompletion,
  createStory,
} from 'definitions/helpers';
import { SentenceType } from 'schema/output-types';

const SentenceMutation = new GraphQLObjectType<unknown, Context>({
  name: 'SentenceMutation',
  fields: {
    create: {
      type: new GraphQLNonNull(SentenceType),
      args: {
        parentSentenceId: { type: new GraphQLNonNull(GraphQLInt) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, ctx) => {
        const { parentSentenceId, text } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        const formattedText = ensureSentenceText(text);
        await ensureNotSpam(Sentence, {
          user: currentUser,
          timeFrameMs: SentenceCreationAntiSpamTimeFrameMs,
          recordsLimit: SentenceCreationAntiSpamRecordsLimit,
        });
        const parentSentence = await ensureModelExistence<Sentence>(parentSentenceId, Sentence);
        const sentence = await Sentence.create({
          ownerId: currentUser.id,
          treeId: parentSentence.treeId,
          parentSentenceId: parentSentence.id,
          text: formattedText,
        });
        return sentence;
      },
    },

    report: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (sentence, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        assert(sentence instanceof Sentence);
        if (sentence.parentSentenceId === null)
          throw new ClientError('Cannot report initial sentence', 'InvalidReport');
        if (sentence.theEnd === true)
          throw new ClientError('Cannot report sentence', 'SentenceAlreadyPartOfStory');
        await ensureNotSpam(Report, {
          user: currentUser,
          timeFrameMs: ReportAntiSpamTimeFrameMs,
          recordsLimit: ReportAntiSpamRecordsLimit,
        });
        if (await StorySentenceLink.count({ where: { sentenceId: sentence.id } }) > 0)
          throw new ClientError('Sentence already part of story', 'SentenceAlreadyPartOfStory');
        await Report.create({
          ownerId: currentUser.id,
          resourceType: Sentence.name,
          resourceId: sentence.id,
        });
        const reportsCount = await Report.count({
          where: {
            resourceType: Sentence.name,
            resourceId: sentence.id,
          },
        });
        if (reportsCount >= NbReportsToDeleteSentence)
          await sentence.destroy();
        return true;
      },
    },

    markCompleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (sentence, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        assert(sentence instanceof Sentence);
        if (sentence.parentSentenceId === null)
          throw new Error('Unable to vote for the initial sentence');
        if (sentence.theEnd === true)
          throw new ClientError('Sentence already marked completed', 'SentenceAlreadyPartOfStory');
        await ensureNotSpam(Completion, {
          user: currentUser,
          timeFrameMs: CompletionAntiSpamTimeFrameMs,
          recordsLimit: CompletionAntiSpamRecordsLimit,
        });
        await Completion.create({
          ownerId: currentUser.id,
          sentenceId: sentence.id,
        });
        if (await checkCompletion(sentence))
          await createStory(sentence);
        return true;
      },
    },
  },
});

export default SentenceMutation;
