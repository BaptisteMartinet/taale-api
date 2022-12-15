import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    test: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
  },
});

export default MutationType;
