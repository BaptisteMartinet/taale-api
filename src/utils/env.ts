import dotenv from 'dotenv';
dotenv.config();

export interface Env {
  DATABASE_URL: string,
  PORT?: number,
}

const {
  DATABASE_URL,
  PORT,
} = process.env;

if (!DATABASE_URL)
  throw new Error('Missing env variables');

const vars: Env = {
  DATABASE_URL,
  PORT: PORT !== undefined ? parseInt(PORT) : undefined,
};

export default vars;
