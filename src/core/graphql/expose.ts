/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GraphQLFieldConfig, GraphQLOutputType } from 'graphql';
import type { ModelStatic } from 'sequelize';
import type { Context } from 'core/context';

import { GraphQLInt } from 'graphql';
import { Role } from 'definitions/enums';

export interface ExposeOptions {
  ensureAuth?: boolean;
  ensureAdmin?: boolean;
  ensureSource?: ModelStatic<any>;
}

function expose(type: GraphQLOutputType, opts?: ExposeOptions): GraphQLFieldConfig<unknown, Context> {
  return {
    type,
    ...(opts?.ensureSource ? { args: { id: { type: GraphQLInt } } } : null),
    resolve: async (parent, args, ctx) => {
      const { id } = args;
      if (!opts)
        return {};
      const { ensureAuth, ensureAdmin, ensureSource } = opts;
      if (ensureAuth && !ctx.currentUser)
        throw new Error('User must be authenticated');
      if (ensureAdmin && ctx.currentUser?.role !== Role.Admin)
        throw new Error('User must be admin');
      if (ensureSource && id) {
        const source = await ensureSource.findByPk(id);
        if (!source)
          throw new Error(`Resource#${id} does not exists`);
        return source;
      }
      return {};
    },
  };
}

export default expose;
