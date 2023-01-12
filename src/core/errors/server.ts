import { GraphQLError } from 'graphql';

export enum ServerErrorT {}

class ServerError extends GraphQLError {
  constructor(message: string, type: ServerErrorT) {
    super(message);
    Object.defineProperty(this, 'name', { value: 'ServerError' });
    this.extensions.code = type;
  }
}

export default ServerError;
