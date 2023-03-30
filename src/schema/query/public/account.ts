import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ensureUsername } from 'definitions/helpers';

const AccountQuery = new GraphQLObjectType({
  name: 'AccountQuery',
  fields: {
    usernameAvailability: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args, ctx) {
        const { username } = args;
        await ensureUsername(username);
        return true;
      },
    },
  },
});

export default AccountQuery;
