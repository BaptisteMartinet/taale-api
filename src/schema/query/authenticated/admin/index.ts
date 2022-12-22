import type { Context } from 'core/context';

import { GraphQLList, GraphQLObjectType } from 'graphql';
import { User } from 'definitions/models';
import { UserType } from 'schema/output-types';

const AdminQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AdminQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return User.findAll();
      },
    },
  },
});

export default AdminQuery;
