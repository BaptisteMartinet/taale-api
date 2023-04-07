import { GraphQLError } from 'graphql';

export type ServerErrorT = null;

class ServerError extends GraphQLError {
  constructor(message: string, type: ServerErrorT) {
    super(message);
    this.name = 'ServerError';
    this.extensions.code = type;
  }
}

export default ServerError;
