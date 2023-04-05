import type { Context } from 'core/context';
import type { User } from 'definitions/models';

import { TaaleEmailSender } from 'core/constants';
import sgMail from 'core/sendgrid';
import render from 'notification/emails/transactional/account-created';
import texts from 'notification/emails/transactional/account-created/texts';

export interface onAccountCreatedArgs {
  user: User;
}

export default function onAccountCreated(args: onAccountCreatedArgs, ctx: Context) {
  const { user } = args;
  const T = texts(ctx.locale);
  return Promise.all([
    sgMail.send({
      from: TaaleEmailSender,
      to: user.email,
      subject: T.subject(user.username),
      html: render({ ctx }),
    }),
    sgMail.send({
      from: TaaleEmailSender,
      to: TaaleEmailSender,
      subject: 'New account',
      text: `A new user has been registered:\n${JSON.stringify(user.toJSON(), null, 4)}`,
    }),
  ])
}
