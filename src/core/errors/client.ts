import { GraphQLError } from 'graphql';

export type ClientErrorType = (
  'InvalidLoginOrPassword' |
  'InvalidEmailFormat' |
  'EmailTaken' |
  'InvalidValidationCode' |
  'InvalidUsernameLength' |
  'InvalidUsernameChar' |
  'UsernameTaken' |
  'InvalidSentenceLength' |
  'ResourceNotFound' |
  'SpamDetected' |
  'InsufficientPermission' |
  'InvalidArgument' |
  'SentenceAlreadyPartOfStory' |
  'SentenceAlreadyReported' |
  'SentenceAlreadyMarkedComplete'
);

class ClientError extends GraphQLError {
  constructor(message: string, type: ClientErrorType) {
    super(message);
    this.name = 'ClientError';
    this.extensions.code = type;
  }
}

export default ClientError;
