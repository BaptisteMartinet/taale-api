import assert from 'assert';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from 'core/context';
import { Story } from 'definitions/models';
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
        return story;
      },
    },
    // update
    // delete
  },
});

export default StoryMutation;
