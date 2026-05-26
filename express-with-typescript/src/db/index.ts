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
        password TEXT NOT NULL,
        is_active boolean DEFAULT true,
        age INT,
        role VARCHAR(10) DEFAULT 'user',

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile(
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(10),
        
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("CREATE A TABLE SUCCESSFULLY!");
  } catch (error) {
    console.error(error);
  }
};
