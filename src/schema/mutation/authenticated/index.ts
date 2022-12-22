import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import AdminMutation from './admin';

const AuthenticatedMutation = new GraphQLObjectType({
  name: 'AuthenticatedMutation',
  fields: {
    admin: expose(AdminMutation, { ensureAdmin: true }),
  },
});

export default AuthenticatedMutation;
