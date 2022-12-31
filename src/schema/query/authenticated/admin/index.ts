import type { Context } from 'core/context';

import { GraphQLList, GraphQLObjectType } from 'graphql';
import { User, Story } from 'definitions/models';
import { UserRestricted, StoryType } from 'schema/output-types';

const AdminQuery = new GraphQLObjectType<unknown, Context>({
  name: 'AdminQuery',
  fields: {
    users: {
      type: new GraphQLList(UserRestricted),
      resolve: () => User.findAll(),
    },

    stories: {
      type: new GraphQLList(StoryType),
      resolve: () => Story.findAll({ include: [ Story.associations.owner, Story.associations.sentences ] }),
    },
  },
});

export default AdminQuery;
