import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { User } from 'models';
import * as bcrypt from 'bcrypt';

const AccountMutation = new GraphQLObjectType({
  name: 'AccountMutation',
  fields: {
    register: {
      type: GraphQLBoolean,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, ctx) => {
        const { password, ...userArgs } = args;
        const { email } = args;
        if (await User.count({ where: { email } }) > 0)
          throw new Error('Email already taken');
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          password: hashedPassword,
          ...userArgs,
        });
        return true;
      },
    },

    login: {
      type: GraphQLBoolean,
      resolve: async () => {
        //todo
      },
    },
  },
});

export default AccountMutation;
