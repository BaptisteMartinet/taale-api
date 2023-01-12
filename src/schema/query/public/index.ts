import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Story } from 'definitions/models';
import { StoryType } from 'schema/output-types';
import { ensureModelExistence } from 'core/sequelize';

const PublicQuery = new GraphQLObjectType({
  name: 'PublicQuery',
  fields: {
    // TODO filtrer par locale et paginer ?
    stories: {
      type: new GraphQLList(StoryType),
      resolve: () => Story.findAll(),
    },

    story: {
      type: StoryType,
      args: {
        storyId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (source, args, ctx) => {
        const { storyId } = args;
        const story = await ensureModelExistence(storyId, Story);
        return story;
      },
    },
  },
});

export default PublicQuery;
