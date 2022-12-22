import type {
  GraphQLFieldConfig,
  GraphQLObjectType
} from 'graphql';
import type { Context } from 'core/context';

import { Role } from 'definitions/enums';

export interface ExposeOptions {
  ensureAuth?: boolean;
  ensureAdmin?: boolean;
}

function expose(type: GraphQLObjectType, opts?: ExposeOptions): GraphQLFieldConfig<unknown, Context> {
  return {
    type: type,
    resolve: (parent, args, ctx) => {
      if (opts?.ensureAuth && !ctx.currentUser)
        throw new Error('User must be authenticated');
      if (opts?.ensureAdmin && ctx.currentUser?.role !== Role.Admin)
        throw new Error('User must be admin');
      return {};
    },
  };
}

export default expose;
