import type { Context } from 'core/context';

import { TaaleEmailSender } from 'core/constants';
import sgMail from 'core/sendgrid';
import render from 'notification/emails/transactional/forgot-password';
import texts from 'notification/emails/transactional/forgot-password/texts';

export interface onInitiatePasswordResetArgs {
  email: string;
  code: string;
}

export default function onForgotPassword(args: onInitiatePasswordResetArgs, ctx: Context) {
  const { email, code } = args;
  const T = texts(ctx.locale);
  return sgMail.send({
    from: TaaleEmailSender,
    to: email,
    subject: T.subject,
    html: render({ code, ctx }),
  });
}
