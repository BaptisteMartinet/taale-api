import type { GraphQLFieldConfig, GraphQLOutputType } from 'graphql';
import type { ModelStatic, Model } from 'sequelize';
import type { Context } from 'core/context';

import { GraphQLInt } from 'graphql';
import { ensureModelExistence } from 'core/sequelize';
import { ClientError, ClientErrorT } from 'core/errors';
import { User } from 'definitions/models';
import { Role } from 'definitions/enums';

export interface ExposeOptions {
  ensureAuth?: boolean;
  ensureAdmin?: boolean;
  ensureSource?: ModelStatic<Model>;
}

function expose(type: GraphQLOutputType, opts: ExposeOptions = {}): GraphQLFieldConfig<unknown, Context> {
  const { ensureAuth, ensureAdmin, ensureSource } = opts;
  return {
    type,
    ...(opts?.ensureSource ? { args: { id: { type: GraphQLInt } } } : null),
    resolve: async (parent, args, ctx) => {
      if (!opts)
        return {};
      const { id } = args;
      const { currentUser, currentUserId } = ctx;
      if (ensureAuth && !currentUser && currentUserId)
        ctx.currentUser = await ensureModelExistence(currentUserId, User);
      if (ensureAuth && !ctx.currentUser)
        throw new ClientError('User must be authenticated', ClientErrorT.InsufficientPermission);
      if (ensureAdmin && ctx.currentUser?.role !== Role.Admin)
        throw new ClientError('User must be admin', ClientErrorT.InsufficientPermission);
      if (ensureSource && id)
        return ensureModelExistence(id, ensureSource);
      return {};
    },
  };
}

export default expose;
