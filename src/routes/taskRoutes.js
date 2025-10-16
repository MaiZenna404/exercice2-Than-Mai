import express from 'express';
import { getTasks, addTask, deleteTask } from '../controllers/taskControllers.js';

const router = express.Router();

router.get('/tasks-list', getTasks);
router.post('/add-task', addTask);
router.delete('/delete-task/:id', deleteTask);

export default router;
