import type { Context } from 'core/context';

import { TaaleEmailSender } from 'core/constants';
import sgMail from 'core/sendgrid';
import render from 'notification/emails/transactional/email-verification';
import texts from 'notification/emails/transactional/email-verification/texts';

export interface onEmailVerificationArgs {
  email: string;
  code: string;
}

export default function onEmailVerification(args: onEmailVerificationArgs, ctx: Context) {
  const { email, code } = args;
  const T = texts(ctx.locale);
  return sgMail.send({
    from: TaaleEmailSender,
    to: email,
    subject: T.subject,
    html: render({ code, ctx }),
  });
}
