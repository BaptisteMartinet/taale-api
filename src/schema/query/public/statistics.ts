import { GraphQLObjectType, GraphQLInt } from 'graphql';
import { User, Tree, Story, Sentence } from 'definitions/models';

const StatisticsQuery = new GraphQLObjectType({
  name: 'StatisticsQuery',
  fields: {
    users: {
      type: GraphQLInt,
      resolve: () => User.count(),
    },
    openTrees: {
      type: GraphQLInt,
      resolve: () => Tree.count({ where: { open: true } }),
    },
    stories: {
      type: GraphQLInt,
      resolve: () => Story.count(),
    },
    sentences: {
      type: GraphQLInt,
      resolve: () => Sentence.count(),
    },
  },
});

export default StatisticsQuery;
