import { Sequelize } from 'sequelize';
import env from './env';

console.log('creating db...');

export default new Sequelize(env.DATABASE_URL);
