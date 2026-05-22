import { Pool } from "pg";
import config from "../config";

// ________ connect with DB by POOL _______________________
export const pool = new Pool({
  connectionString: config.connection_string,
});

// ________ CREATE A TABLE _______________________
export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(30) NOT NULL,
        is_active boolean DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("CREATE A TABLE SUCCESSFULLY!");
  } catch (error) {
    console.error(error);
  }
};