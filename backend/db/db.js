import "dotenv/config";
import { Pool } from "pg";

const { PGDATABASE, PGUSER, PGHOST, PGPASSWORD } = process.env;

export const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

const connect = async () => {
  try {
    const client = await pool.connect();
    console.log("DB connected");
    client.release();
  } catch (err) {
    console.lerror("DB connection failed:", err);
  }
};

connect();
