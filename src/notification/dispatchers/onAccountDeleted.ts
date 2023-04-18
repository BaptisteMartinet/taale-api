import type { User } from 'definitions/models';

import { TaaleEmailSender } from 'core/constants';
import sgMail from 'core/sendgrid';

export interface onAccountDeletedArgs {
  user: User;
}

export default function onAccountDeleted(args: onAccountDeletedArgs) {
  const { user } = args;
  return sgMail.send({
    from: TaaleEmailSender,
    to: TaaleEmailSender,
    subject: 'Account deletion',
    text: `User has deleted its account:\n${JSON.stringify(user.toJSON(), null, 4)}`,
  });
}
