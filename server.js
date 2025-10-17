// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS)
import cors from 'cors';
import { connectToDB } from './dbConnections/mongoDb/db.js'; // uncomment this line to use MongoDB
import { connectToDB as connectToPostgresDB } from './dbConnections/postgreSQL/db.js';
import express from 'express';
import taskCRUDRoutes from './src/routes/taskRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const api_uri = process.env.LOCALHOST_URI + port;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use the CRUD routes
app.use(taskCRUDRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect to the database and then start the server

(async () => {
  
  console.log("Starting database connection...");
  try {
    await connectToPostgresDB();
    console.log("Database connection successful. Starting server...");
    app.listen(port, () => {
  console.log(`Server listening on ${api_uri}`);
});

  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
