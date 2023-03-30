import { GraphQLError } from 'graphql';

export enum ClientErrorT {
  InvalidPassword = 'InvalidPassword',
  EmailTaken = 'EmailTaken',
  InvalidUsernameLength = 'InvalidUsernameLength',
  InvalidUsernameChar = 'InvalidUsernameChar',
  UsernameTaken = 'UsernameTaken',
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
