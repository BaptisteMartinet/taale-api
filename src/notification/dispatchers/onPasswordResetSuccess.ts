import type { Context } from 'core/context';

import { TaaleEmailSender } from 'core/constants';
import sgMail from 'core/sendgrid';
import render from 'notification/emails/transactional/password-reset-success';
import texts from 'notification/emails/transactional/password-reset-success/texts';

export interface onPasswordResetSuccessArgs {
  email: string;
}

export default function onPasswordResetSuccess(args: onPasswordResetSuccessArgs, ctx: Context) {
  const { email } = args;
  const T = texts(ctx.locale);
  return sgMail.send({
    from: TaaleEmailSender,
    to: email,
    subject: T.subject,
    html: render({ ctx }),
  });
}
