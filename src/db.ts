import { Sequelize } from 'sequelize';

console.log('creating db...');

export default new Sequelize('postgres://postgres:admin@127.0.0.1:5432/taale');
