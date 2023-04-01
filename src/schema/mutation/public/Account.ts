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
import { TaaleEmailSender, EmailVerificationCodeLength } from 'core/constants';
import sgMail from 'core/sendgrid';
import { User, EmailValidationCode } from 'definitions/models';
import { ensureUsername, ensureEmail } from 'definitions/helpers';
import { UserType } from 'schema/output-types';

const AccountMutation = new GraphQLObjectType({
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
        await EmailValidationCode.upsert({ email, code }, { fields: ['email'] });
        await sgMail.send({
          from: TaaleEmailSender,
          to: email,
          subject: 'Confirm your account creation!',
          text: 'Here is you code: ' + code, // todo
        });
        return true;
      },
    },

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
        await ensureUsername(username);
        await ensureEmail(email);
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
