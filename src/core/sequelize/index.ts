import { Sequelize } from 'sequelize';
import env from 'core/env';

export default new Sequelize(env.DATABASE_URL);
