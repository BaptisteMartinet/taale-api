import dotenv from 'dotenv';
dotenv.config();

export interface Env {
  DATABASE_URL: string;
  PORT?: number;
  JWT_SECRET_KEY: string;
}

const {
  DATABASE_URL,
  PORT,
  JWT_SECRET_KEY,
} = process.env;

if (!DATABASE_URL || !JWT_SECRET_KEY)
  throw new Error('Missing env variables');

const vars: Env = {
  DATABASE_URL,
  PORT: PORT !== undefined ? parseInt(PORT) : undefined,
  JWT_SECRET_KEY,
};

export default vars;
