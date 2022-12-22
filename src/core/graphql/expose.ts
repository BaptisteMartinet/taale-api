import type {
  GraphQLFieldConfig,
  GraphQLObjectType
} from 'graphql';
import type { Context } from 'core/context';

interface ExposeOptions {
  ensureAuth?: boolean,
}

function expose(type: GraphQLObjectType, opts?: ExposeOptions): GraphQLFieldConfig<unknown, Context> {
  return {
    type: type,
    resolve: (parent, args, ctx) => {
      if (opts?.ensureAuth && !ctx.currentUser)
        throw new Error('User must be authenticated');
      return {};
    },
  };
}

export default expose;
