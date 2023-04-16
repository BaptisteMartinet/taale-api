import type { Context } from 'core/context';

import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNullList } from 'lib/graphql';
import { User, Tree, Sentence } from 'definitions/models';
import { UserRestrictedType, TreeType, SentenceType } from 'schema/output-types';

const AdminQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AdminQuery',
  fields: {
    users: {
      type: new GraphQLNonNullList(UserRestrictedType),
      resolve: () => User.findAll(),
    },

    trees: {
      type: new GraphQLNonNullList(TreeType),
      resolve: () => Tree.findAll({ include: [Tree.associations.owner, Tree.associations.sentences] }),
    },

    sentences: {
      type: new GraphQLNonNullList(SentenceType),
      resolve: () => Sentence.findAll({ include: Sentence.associations.owner }),
    },
  },
});

export default AdminQuery;
