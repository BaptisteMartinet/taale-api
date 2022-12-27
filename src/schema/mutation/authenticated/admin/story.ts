import assert from 'assert';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from 'core/context';
import { Sentence, Story } from 'definitions/models';
import { StoryType } from 'schema/output-types';

const StoryMutation = new GraphQLObjectType<Story, Context>({
  name: 'StoryMutation',
  fields: {
    create: {
      type: StoryType,
      args: {
        open: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: async (source, args, ctx) => {
        const { open } = args;
        const { currentUser } = ctx;
        assert(currentUser);
        const story = await Story.create({
          ownerId: currentUser.id,
          open
        });
        await Sentence.create({
          ownerId: currentUser.id,
          storyId: story.id,
          text: 'Il était une fois,', // TODO lang
        });
        return story;
      },
    },
    // update
    // delete
  },
});

export default StoryMutation;
