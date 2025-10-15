// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS)
import cors from 'cors';

import express from 'express';
import getTasks from './routes/getTasks.js';
import postTask from './routes/postTask.js';
import deleteTask from './routes/deleteTask.js';

const app = express();
const port = process.env.PORT || 3000;
const api_uri = process.env.LOCALHOST_URI + port;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use the CRUD routes
app.use(getTasks);
app.use(postTask);
app.use(deleteTask);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on ${api_uri}`);
});
