import type { Context } from 'core/context';

import { GraphQLList, GraphQLObjectType } from 'graphql';
import { User, Tree } from 'definitions/models';
import { UserRestricted, TreeType } from 'schema/output-types';

const AdminQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AdminQuery',
  fields: {
    users: {
      type: new GraphQLList(UserRestricted),
      resolve: () => User.findAll(),
    },

    stories: {
      type: new GraphQLList(TreeType),
      resolve: () => Tree.findAll({ include: [ Tree.associations.owner, Tree.associations.sentences ] }),
    },
  },
});

export default AdminQuery;
