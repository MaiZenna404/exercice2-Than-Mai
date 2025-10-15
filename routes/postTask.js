import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // module to generate unique ids
import tasks from '../data/tasks.js';

const router = express.Router();

// Adding users to the tasks array
router.post('/add-task', (req, res) => {
    const { title, description } = req.body; // Define the requested body
    tasks.push({ id: uuidv4(), title, description });
    // Check if title is provided
    !title ? res.status(400).send('A title and description is required to your new task') : res.status(201).send('Task added successfully to the list');
})

export default router;