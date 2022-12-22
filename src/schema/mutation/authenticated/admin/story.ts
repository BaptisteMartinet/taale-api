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
      resolve: (source, args, ctx) => {
        const { currentUser } = ctx;
        assert(currentUser);
        return Story.create({
          ownerId: currentUser.id,
          open: true,
        });
      },
    },
    // update
    // delete
  },
});

export default StoryMutation;
