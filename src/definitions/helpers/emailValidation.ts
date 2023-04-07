import { ClientError } from 'core/errors';
import { EmailValidationCode } from 'definitions/models';

export async function ensureEmailValidationCode(email: string, code: string) {
  if (await EmailValidationCode.count({ where: { email, code } }) <= 0)
    throw new ClientError('Invalid email validation code', 'InvalidEmailValidationCode');
  await EmailValidationCode.destroy({ where: { email } });
}
