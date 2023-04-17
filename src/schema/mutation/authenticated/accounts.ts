import type { Context } from 'core/context';

import assert from 'assert';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

const AuthenticatedAccountMutation = new GraphQLObjectType<unknown, Context>({
  name: 'AuthenticatedAccountMutation',
  fields: {
    deleteAccount: {
      type: new GraphQLNonNull(GraphQLBoolean),
      async resolve(source, args, ctx) {
        const { currentUser } = ctx;
        assert(currentUser !== undefined);
        await currentUser.destroy();
        return true;
      },
    },
  },
});

export default AuthenticatedAccountMutation;
