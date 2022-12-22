import type { ContextFunction, BaseContext } from '@apollo/server';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import * as jwt from 'jsonwebtoken';
import env from 'core/env';
import { User } from 'definitions/models';

export interface Context extends BaseContext {
  currentUser?: User;
}

const context: ContextFunction<[StandaloneServerContextFunctionArgument], Context> = async ({ req, res }) => {
  const ctx: Context = {};
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return ctx;
  const [, token] = authHeader.split(' ');
  try {
    const payload = jwt.verify(token, env.JWT_SECRET_KEY) as jwt.JwtPayload;
    const currentUser = await User.findByPk(payload.userId);
    if (!currentUser)
      throw new Error('User does not exist');
    Object.assign(ctx, { currentUser });
  } catch (error) {
    console.error(error);
  }
  return ctx;
}

export default context;
