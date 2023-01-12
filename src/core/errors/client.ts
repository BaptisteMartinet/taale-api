import { GraphQLError } from 'graphql';

export enum ClientErrorT {
  InvalidPassword = 'InvalidPassword',
  EmailTaken = 'EmailTaken',
  UsernameTaken = 'UsernameTaken',
  ResourceNotFound = 'ResourceNotFound',
}

class ClientError extends GraphQLError {
  constructor(message: string, type: ClientErrorT) {
    super(message);
    Object.defineProperty(this, 'name', { value: 'ClientError' });
    this.extensions.code = type;
  }
}

export default ClientError;
