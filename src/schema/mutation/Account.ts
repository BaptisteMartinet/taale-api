import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import env from 'utils/env';
import { User } from 'models';
import { UserType } from 'schema/output-types';

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
      type: new GraphQLObjectType({
        name: 'LoginResponse',
        fields: {
          user: { type: UserType },
          token: { type: GraphQLString },
        },
      }),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, ctx) => {
        const { email, password } = args;
        const user = await User.findOne({ where: { email } });
        if (!user)
          throw new Error('User does not exists');
        if (!bcrypt.compareSync(password, user.password))
          throw new Error('Invalid password');
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return { user, token };
      },
    },
  },
});

export default AccountMutation;
