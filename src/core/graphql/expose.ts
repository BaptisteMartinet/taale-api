/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GraphQLFieldConfig, GraphQLOutputType } from 'graphql';
import type { ModelStatic } from 'sequelize';
import type { Context } from 'core/context';

import { GraphQLInt } from 'graphql';
import ensureModelExistence from 'core/sequelize/ensureModelExistence';
import { User } from 'definitions/models';
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
      if (!opts)
        return {};
      const { id } = args;
      const { ensureAuth, ensureAdmin, ensureSource } = opts;
      const { currentUser, currentUserId } = ctx;
      if (ensureAuth && !currentUser && currentUserId) {
        const user = await User.findByPk(currentUserId);
        if (!user)
          throw new Error('User does not exist');
        ctx.currentUser = user;
      }
      if (ensureAuth && !ctx.currentUser)
        throw new Error('User must be authenticated');
      if (ensureAdmin && ctx.currentUser?.role !== Role.Admin)
        throw new Error('User must be admin');
      if (ensureSource && id) {
        return ensureModelExistence(id, ensureSource);
      }
      return {};
    },
  };
}

export default expose;
