import { ClientError } from 'core/errors';
import { ValidationCode } from 'definitions/models';

export type Action = 'emailVerification' | 'passwordReset';

export interface ValidationCodeArgs {
  email: string;
  code: string;
  action: Action;
}

export function createValidationCode(args: ValidationCodeArgs) {
  return ValidationCode.upsert(args, { fields: ['code'] });
}

export async function ensureValidationCode(args: ValidationCodeArgs) {
  const validationCode = await ValidationCode.findOne({ where: { ...args } });
  if (!validationCode)
    throw new ClientError('Invalid validation code', 'InvalidValidationCode');
  await validationCode.destroy();
}
