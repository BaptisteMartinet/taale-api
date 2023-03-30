import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import env from 'core/env';
import { ClientError, ClientErrorT } from 'core/errors';
import { User } from 'definitions/models';
import { ensureUsername, ensureEmail } from 'definitions/helpers';
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
        const { username, email } = userArgs;
        ensureUsername(username);
        ensureEmail(email);
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
          throw new ClientError('User does not exists', ClientErrorT.ResourceNotFound);
        if (!bcrypt.compareSync(password, user.password))
          throw new ClientError('Invalid password', ClientErrorT.InvalidPassword);
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return { user, token };
      },
    },
  },
});

export default AccountMutation;
