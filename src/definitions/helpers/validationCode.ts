import { ClientError } from 'core/errors';
import { ValidationCode } from 'definitions/models';

export async function ensureValidationCode(email: string, code: string, action: string) {
  if (await ValidationCode.count({ where: { email, code, action } }) <= 0)
    throw new ClientError('Invalid validation code', 'InvalidValidationCode');
  await ValidationCode.destroy({ where: { email, action } });
}
