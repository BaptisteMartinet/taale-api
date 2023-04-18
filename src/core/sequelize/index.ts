import { Sequelize } from 'sequelize';
import env from 'core/env';

export { default as ensureNotSpam } from './ensureNotSpam';
export { default as ensureModelExistence } from './ensureModelExistence';
export * from './associations';

export default new Sequelize(env.DATABASE_URL, { logging: env.NODE_ENV === 'dev' ? console.log : false });
