import { Sequelize } from 'sequelize';
import env from './utils/env';

console.log('creating db...');

export default new Sequelize(env.DATABASE_URL);
