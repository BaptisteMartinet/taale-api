import { GraphQLObjectType } from 'graphql';
import { expose } from 'core/graphql';
import { Tree } from 'definitions/models';
import TreeMutation from './tree';

const AdminMutation = new GraphQLObjectType({
  name: 'AdminMutation',
  fields: {
    tree: expose(TreeMutation, { ensureSource: Tree }),
  },
});

export default AdminMutation;
