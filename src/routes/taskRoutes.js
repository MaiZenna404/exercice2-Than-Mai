import express from 'express';
import { getTasks, addTask, deleteTask } from '../controllers/taskControllers.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The task's title
 *         description:
 *           type: string
 *           description: The task's description
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The auto-generated date when a task is created
 *       example:
 *         id: 1
 *         title: "First Task"
 *         description: "It's my first task !"
 *         createdAt: "2023-01-01T00:00:00Z"
 *     DeleteSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: The HTTP status code
 *         message:
 *           type: string
 *           description: Deletion success message
 *       example:
 *         status: 200
 *         message: "Task successfully deleted"
 *     BadRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: The HTTP status code
 *         message:
 *           type: string
 *           description: Bad request error message
 *       example:
 *         status: 400
 *         message: "Bad request"
 *     ServerError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: The HTTP status code
 *         message:
 *           type: string
 *           description: Internal server error
 *       example:
 *         status: 500
 *         message: "Internal server error"
 */

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API endpoints for managing tasks
 *
 * /add-task:
 *   post:
 *     summary: Add a new task into the list
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Task added successfully to the list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Bad request (e.g., missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *
 * /tasks-list:
 *   get:
 *     summary: Fetch the tasks list
 *     tags:
 *       - Tasks
 *     responses:
 *       '200':
 *         description: Tasks list successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 * 
 * /delete-task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags:
 *       - Tasks
 *     responses:
 *       '200':
 *         description: Task successfully deleted and removed from the list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSuccess'
 *       '400':
 *         description: Bad request (e.g., missing id parameter)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */

const router = express.Router();

router.get('/tasks-list', getTasks);
router.post('/add-task', addTask);
router.delete('/delete-task/:id', deleteTask);

export default router;
