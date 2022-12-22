import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import type { Context } from 'core/context';

import { Role } from 'definitions/enums';

export interface ExposeOptions {
  ensureAuth?: boolean;
  ensureAdmin?: boolean;
  ensureSource?: (id: number) => Promise<unknown>;
}

function expose(type: GraphQLObjectType, opts?: ExposeOptions): GraphQLFieldConfig<unknown, Context> {
  return {
    type: type,
    ...(opts?.ensureSource ? { args: { id: { type: GraphQLInt } } } : null),
    resolve: async (parent, args, ctx) => {
      const { id } = args;
      if (opts?.ensureAuth && !ctx.currentUser)
        throw new Error('User must be authenticated');
      if (opts?.ensureAdmin && ctx.currentUser?.role !== Role.Admin)
        throw new Error('User must be admin');
      if (opts?.ensureSource && id) {
        const source = await opts.ensureSource(id);
        if (!source)
          throw new Error(`Resource#${id} does not exists`);
        return source;
      }
      return {};
    },
  };
}

export default expose;
