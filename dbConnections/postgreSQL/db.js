import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const POSTGRES_URI = process.env.POSTGRES_URI;

const pool = new Pool({
    connectionString: POSTGRES_URI,
});

export const connectToDB = async () => { 
    try {
        await pool.connect();
        console.log("Connection to PostgreSQL successful.");
    } catch (error) {
        console.error("Error connecting to PostgreSQL:", error);
    }

}

export default pool;