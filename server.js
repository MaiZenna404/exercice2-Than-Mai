// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS)
import cors from 'cors';
import { connectToDB as connectToMongoDB } from './dbConnections/mongoDb/db.js';
import { connectToDB as connectToPostgresDB } from './dbConnections/postgreSQL/db.js'; // use this line to connect to PostgreSQL
import express from 'express';
import taskCRUDRoutes from './src/routes/taskRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import jsonWebToken from 'jsonwebtoken';
import UserModel from './src/userModel/user.model.js';


const app = express();
const jwt = jsonWebToken;
const User = UserModel;
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

// Handling post request
app.post("/login",
    (req, res, next) => {
        const { email, password } = req.body;

        // use in-memory model method (synchronous)
        const existingUser = User.findUserByEmail(email, password);

        if (!existingUser) {
            const error = Error("Wrong details please check at once");
            return next(error);
        }

        let token;
        try {
            token = jwt.sign(
                {
                    userId: existingUser.id ?? existingUser.email,
                    email: existingUser.email
                },
                process.env.JWT_SECRET || "secretkeyappearshere",
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }

        return res.status(200).json({
            success: true,
            data: {
                userId: existingUser.id ?? existingUser.email,
                email: existingUser.email,
                token
            },
        });
    });

// Handling post request
app.post("/signup",
    (req, res, next) => {
        const { name, email, password } = req.body;

        // addUser returns a plain object in the current model
        const newUser = User.addUser(email, password);

        // ensure the object has an id for token payload
        if (!newUser.id) newUser.id = Date.now().toString();

        let token;
        try {
            token = jwt.sign(
                {
                    userId: newUser.id,
                    email: newUser.email
                },
                process.env.JWT_SECRET || "secretkeyappearshere",
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }

        return res.status(201).json({
            success: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token
            },
        });
    });

app.get('/accessResource',
  (req, res) => {
    console.log('req.headers:', req.headers); // Debug: log the headers
    const token =
      req.headers
        .authorization.split(' ')[1];
    //Authorization: 'Bearer TOKEN'
    if (!token) {
      res.status(401)
        .json(
          {
            success: false,
            message: "Error!Token was not provided."
          }
        );
    }
    //Decoding the token
    const decodedToken =
      jwt.verify(token, "secretkeyappearshere");
    res.status(200).json(
      {
        success: true,
        data: {
          userId: decodedToken.userId,
          email: decodedToken.email
        }
      }
    );
  });

// Use the CRUD routes
app.use(taskCRUDRoutes);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Connect to the database and then start the server

(async () => {
  
  console.log("Starting database connection...");
  try {
    await connectToMongoDB();
    console.log("Database connection successful. Starting server...");
    app.listen(port, () => {
  console.log(`Server listening on ${api_uri}`);
});

  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
