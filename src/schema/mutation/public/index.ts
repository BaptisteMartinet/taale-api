import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import AccountMutation from './Account';

const PublicMutation = new GraphQLObjectType({
  name: 'PublicMutation',
  fields: {
    account: expose(AccountMutation),
  },
});

export default PublicMutation;
