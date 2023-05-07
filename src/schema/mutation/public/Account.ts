import type { Context } from 'core/context';

import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { genNumericalCode, genAlphaNumericCode } from 'lib/utils';
import env from 'core/env';
import { ClientError } from 'core/errors';
import {
  EmailVerificationCodeLength,
  ResetPasswordCodeLength,
} from 'core/constants';
import { User } from 'definitions/models';
import {
  ensureUsername,
  ensureEmail,
  createValidationCode,
  getValidationCode,
  ensureValidationCode,
} from 'definitions/helpers';
import {
  onEmailVerification,
  onAccountCreated,
  onForgotPassword,
  onPasswordResetSuccess,
} from 'notification/dispatchers';
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
        await createValidationCode({ email, code, action: 'emailVerification' });
        await onEmailVerification({ email, code }, ctx);
        return true;
      },
    },

    resendEmailVerificationCode: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args, ctx) {
        const { email } = args;
        const code = await getValidationCode({ email, action: 'emailVerification' });
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
        await ensureValidationCode({ email, code: emailValidationCode, action: 'emailVerification' });
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
          throw new ClientError('Invalid login or pass', 'InvalidLoginOrPassword');
        if (!bcrypt.compareSync(password, user.password))
          throw new ClientError('Invalid login or pass', 'InvalidLoginOrPassword');
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return { user, token };
      },
    },

    forgotPassword: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(source, args, ctx) {
        const { email } = args;
        if (await User.count({ where: { email } }) <= 0)
          return true;
        const code = genAlphaNumericCode(ResetPasswordCodeLength);
        await createValidationCode({ email, code, action: 'resetPassword' });
        await onForgotPassword({ email, code }, ctx);
        return true;
      },
    },

    resetPassword: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
        validationCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(source, args, ctx) {
        const { email, newPassword, validationCode } = args;
        await ensureValidationCode({ email, code: validationCode, action: 'resetPassword' });
        const user = await User.findOne({ where: { email } });
        if (!user)
          throw new Error('User does not exists');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });
        await onPasswordResetSuccess({ email }, ctx);
        return true;
      },
    },
  },
});

export default AccountMutation;
