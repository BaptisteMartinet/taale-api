import { ClientError } from 'core/errors';
import { ValidationCode } from 'definitions/models';

export type Action = 'emailVerification' | 'resetPassword';

export interface ValidationCodeArgs {
  email: string;
  code: string;
  action: Action;
}

export function createValidationCode(args: ValidationCodeArgs) {
  return ValidationCode.upsert(args, { fields: ['code'] });
}

export async function getValidationCode(args: Omit<ValidationCodeArgs, 'code'>) {
  const validationCode = await ValidationCode.findOne({ where: args, attributes: ['code'] });
  if (!validationCode)
    throw new ClientError(`Unable to find EmailValidationCode for ${args.email}`, 'InvalidArgument');
  return validationCode.code;
}

export async function ensureValidationCode(args: ValidationCodeArgs) {
  const validationCode = await ValidationCode.findOne({ where: { ...args } });
  if (!validationCode)
    throw new ClientError('Invalid validation code', 'InvalidValidationCode');
  await validationCode.destroy();
}
