import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';
import { User, Tree, Story, Sentence } from 'definitions/models';

const StatisticsQuery = new GraphQLObjectType({
  name: 'StatisticsQuery',
  fields: {
    users: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => User.count(),
    },
    openTrees: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => Tree.count({ where: { open: true } }),
    },
    stories: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => Story.count(),
    },
    sentences: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => Sentence.count(),
    },
  },
});

export default StatisticsQuery;
