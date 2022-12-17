import { GraphQLObjectType } from 'graphql';
import AccountMutation from './Account';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    account: {
      type: AccountMutation,
      resolve: () => ({}),
    },
  },
});

export default MutationType;
