// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS)
import cors from 'cors';
import { connectToDB } from './dbConnections/mongoDb/db.js'; // uncomment this line to use MongoDB
import { connectToDB as connectToPostgresDB } from './dbConnections/postgreSQL/db.js';
import express from 'express';
import taskCRUDRoutes from './src/routes/taskRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const app = express();
const port = process.env.PORT || 3000;
const api_uri = process.env.LOCALHOST_URI + port;
const swaggerUI = swaggerUi;
const swaggerJavascriptDoc = swaggerJSDoc;

// Swagger setup

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API Documentation for a task manager application',
    },
    servers: [
      { url: 'http://localhost:3000' },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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
