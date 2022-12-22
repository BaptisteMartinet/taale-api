import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import PublicMutation from './public';
import AuthenticatedMutation from './authenticated';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    public: expose(PublicMutation),
    authenticated: expose(AuthenticatedMutation, { ensureAuth: true }),
  },
});

export default MutationType;
