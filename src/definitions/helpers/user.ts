import {
  EmailValidationRegex,
  UsernameMinLength,
  UsernameMaxLength,
  UsernameValidationRegex,
} from 'core/constants';
import { ClientError } from 'core/errors';
import { User } from 'definitions/models';

export async function ensureUsername(username: string) {
  if (username.length < UsernameMinLength || username.length > UsernameMaxLength)
    throw new ClientError('Invalid username length', 'InvalidUsernameLength');
  if (!UsernameValidationRegex.test(username))
    throw new ClientError('Invalid username character', 'InvalidUsernameChar');
  if (await User.count({ where: { username } }) > 0)
    throw new ClientError('Username already taken', 'UsernameTaken');
}

export async function ensureEmail(email: string) {
  if (!EmailValidationRegex.test(email))
    throw new ClientError('Invalid email format', 'InvalidEmailFormat');
  if (await User.count({ where: { email } }) > 0)
    throw new ClientError('Email already taken', 'EmailTaken');
}
