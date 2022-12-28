import type { ContextFunction, BaseContext } from '@apollo/server';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import type { User } from 'definitions/models';

import * as jwt from 'jsonwebtoken';
import env from 'core/env';

export interface Context extends BaseContext {
  currentUserId?: number;
  currentUser?: User;
}

const context: ContextFunction<[StandaloneServerContextFunctionArgument], Context> = async ({ req, res }) => {
  const ctx: Context = {};
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return ctx;
  const [, token] = authHeader.split(' ');
  if (!token)
    return ctx;
  try {
    const payload = jwt.verify(token, env.JWT_SECRET_KEY) as jwt.JwtPayload;
    Object.assign(ctx, { currentUserId: payload.userId });
  } catch (error) {
    console.error(error);
  }
  return ctx;
}

export default context;
