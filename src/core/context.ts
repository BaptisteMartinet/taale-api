import type { ContextFunction, BaseContext } from '@apollo/server';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import type { User } from 'definitions/models';
import type { Locale } from 'definitions/enums';

import * as jwt from 'jsonwebtoken';
import env from 'core/env';
import { strToLocale } from 'definitions/helpers';

export interface Context extends BaseContext {
  currentUserId?: number;
  currentUser?: User;
  locale: Locale;
}

const context: ContextFunction<[StandaloneServerContextFunctionArgument], Context> = async ({ req, res }) => {
  const contentLanguageHeader = req.headers['content-language'];
  const locale = strToLocale(contentLanguageHeader);
  const ctx: Context = { locale };
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return ctx;
  const [, token] = authHeader.split(' ');
  if (!token)
    throw new Error('Invalid authorization header');
  try {
    const payload = jwt.verify(token, env.JWT_SECRET_KEY) as jwt.JwtPayload;
    ctx.currentUserId = payload.userId;
  } catch (error) { /*empty*/ }
  return ctx;
}

export default context;
