import type { Context } from 'core/context';

import { GraphQLList, GraphQLObjectType } from 'graphql';
import { User, Tree } from 'definitions/models';
import { UserRestrictedType, TreeType } from 'schema/output-types';

const AdminQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AdminQuery',
  fields: {
    users: {
      type: new GraphQLList(UserRestrictedType),
      resolve: () => User.findAll(),
    },

    trees: {
      type: new GraphQLList(TreeType),
      resolve: () => Tree.findAll({ include: [ Tree.associations.owner, Tree.associations.sentences ] }),
    },
  },
});

export default AdminQuery;
