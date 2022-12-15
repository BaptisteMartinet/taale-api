import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    test: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
  },
});

export default QueryType;
