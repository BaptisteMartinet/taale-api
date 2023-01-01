import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import { Sentence } from 'definitions/models';
import AdminMutation from './admin';
import SentenceMutation from './sentence';

const AuthenticatedMutation = new GraphQLObjectType({
  name: 'AuthenticatedMutation',
  fields: {
    admin: expose(AdminMutation, { ensureAdmin: true }),
    sentence: expose(SentenceMutation, { ensureSource: Sentence }),
  },
});

export default AuthenticatedMutation;
