import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

const PublicQuery = new GraphQLObjectType({
  name: 'PublicQuery',
  fields: {
    test: {
      type: GraphQLBoolean,
    },
  },
});

export default PublicQuery;
