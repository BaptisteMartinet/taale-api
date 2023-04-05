import type { Context } from 'core/context';

import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { genNumericalCode } from 'lib/utils';
import env from 'core/env';
import { ClientError, ClientErrorT } from 'core/errors';
import { EmailVerificationCodeLength } from 'core/constants';
import { User, EmailValidationCode } from 'definitions/models';
import {
  ensureUsername,
  ensureEmail,
  ensureEmailValidationCode,
} from 'definitions/helpers';
import { onEmailVerification, onAccountCreated } from 'notification/dispatchers';
import { UserType } from 'schema/output-types';

const AccountMutation = new GraphQLObjectType<unknown, Context>({
  name: 'AccountMutation',
  fields: {
    verifyEmail: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args, ctx) {
        const { email } = args;
        await ensureEmail(email);
        const code = genNumericalCode(EmailVerificationCodeLength);
        await EmailValidationCode.upsert({ email, code }, { fields: ['code'] });
        await onEmailVerification({ email, code }, ctx);
        return true;
      },
    },

    register: {
      type: GraphQLBoolean,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        emailValidationCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, ctx) => {
        const { password, emailValidationCode, ...userArgs } = args;
        const { username, email } = userArgs;
        await ensureUsername(username);
        await ensureEmail(email);
        await ensureEmailValidationCode(email, emailValidationCode);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          password: hashedPassword,
          ...userArgs,
        });
        await onAccountCreated({ user }, ctx);
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
