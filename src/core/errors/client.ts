import { GraphQLError } from 'graphql';

export enum ClientErrorT {
  InvalidLoginOrPassword = 'InvalidLoginOrPassword',
  InvalidEmailFormat = 'InvalidEmailFormat',
  EmailTaken = 'EmailTaken',
  InvalidEmailValidationCode = 'InvalidEmailValidationCode',
  InvalidUsernameLength = 'InvalidUsernameLength',
  InvalidUsernameChar = 'InvalidUsernameChar',
  UsernameTaken = 'UsernameTaken',
  InvalidSentenceLength = 'InvalidSentenceLength',
  ResourceNotFound = 'ResourceNotFound',
  SpamDetected = 'SpamDetected',
  InsufficientPermission = 'InsufficientPermission',
}

class ClientError extends GraphQLError {
  constructor(message: string, type: ClientErrorT) {
    super(message);
    Object.defineProperty(this, 'name', { value: 'ClientError' });
    this.extensions.code = type;
  }
}

export default ClientError;
