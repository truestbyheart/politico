import dotenv from 'custom-env';
import { Pool } from 'pg';

const env = process.env.NODE_ENV || 'development';
const cleanEnv = env.replace(/ /g, '');
dotenv.env(cleanEnv);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


export default pool;
