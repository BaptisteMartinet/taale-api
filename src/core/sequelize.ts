import { Sequelize } from 'sequelize';
import env from './env';

export default new Sequelize(env.DATABASE_URL);
