import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import { Story } from 'definitions/models';
import StoryMutation from './story';

const AdminMutation = new GraphQLObjectType({
  name: 'AdminMutation',
  fields: {
    story: expose(StoryMutation, { ensureSource: Story }),
  },
});

export default AdminMutation;
