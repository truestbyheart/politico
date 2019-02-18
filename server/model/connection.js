import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('remove', () => {
  process.exit(0);
});

export default pool;
