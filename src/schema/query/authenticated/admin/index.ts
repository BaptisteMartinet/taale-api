import type { Context } from 'core/context';

import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNullList } from 'lib/graphql';
import { User, Tree } from 'definitions/models';
import { UserRestrictedType, TreeType } from 'schema/output-types';

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
  },
});

export default AdminQuery;
