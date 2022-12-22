import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import AdminQuery from './admin';

const AuthenticatedQuery = new GraphQLObjectType({
  name: 'AuthenticatedQuery',
  fields: {
    admin: expose(AdminQuery, { ensureAdmin: true }),
  },
});

export default AuthenticatedQuery;
