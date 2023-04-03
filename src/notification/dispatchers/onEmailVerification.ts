import sgMail from 'core/sendgrid';
import { TaaleEmailSender } from 'core/constants';
import render from 'notification/emails/transactional/emailVerification';

export interface sendEmailVerificationCodeArgs {
  email: string;
  code: string;
}

export default function onEmailVerification(args: sendEmailVerificationCodeArgs) {
  const { email, code } = args;
  return sgMail.send({
    from: TaaleEmailSender,
    to: email,
    subject: 'Account creation', // TODO texts
    html: render({ code }),
  });
}
