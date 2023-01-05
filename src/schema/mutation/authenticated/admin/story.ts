import assert from 'assert';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from 'core/context';
import { Sentence, Story } from 'definitions/models';
import { LocaleEnum } from 'definitions/enums';
import { genInitialSentenceText } from 'definitions/helpers';
import { StoryType } from 'schema/output-types';

const StoryMutation = new GraphQLObjectType<unknown, Context>({
  name: 'StoryMutation',
  fields: {
    create: {
      type: StoryType,
      args: {
        open: { type: new GraphQLNonNull(GraphQLBoolean) },
        locale: { type: new GraphQLNonNull(LocaleEnum) },
      },
      resolve: async (source, args, ctx) => {
        const { open, locale } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        const story = await Story.create({
          ownerId: currentUser.id,
          open,
          locale,
        });
        const initialText = genInitialSentenceText(locale);
        await Sentence.create({
          ownerId: currentUser.id,
          storyId: story.id,
          text: initialText,
        });
        return story;
      },
    },
    // update
    // delete

    close: {
      type: GraphQLBoolean,
      resolve: async (source, args, ctx) => {
        if (!(source instanceof Story))
          throw new Error('Source must be Story');
        await source.update({ open: false });
        return true;
      },
    },
  },
});

export default StoryMutation;
