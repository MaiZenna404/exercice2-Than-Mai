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
 */

const router = express.Router();

router.get('/tasks-list', getTasks);
router.post('/add-task', addTask);
router.delete('/delete-task/:id', deleteTask);

export default router;
