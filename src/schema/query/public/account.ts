import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { User } from 'definitions/models';
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
        const userCount = await User.count({ where: { username } });
        return (userCount === 0);
      },
    },
  },
});

export default AccountQuery;
