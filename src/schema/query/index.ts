import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import PublicQuery from './public';
import AuthenticatedQuery from './authenticated';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    public: expose(PublicQuery),
    authenticated: expose(AuthenticatedQuery, { ensureAuth: true }),
  },
});

export default QueryType;
