import express from 'express';
import tasks from '../data/tasks.js';

const router = express.Router();


// Fetch the tasks list
// added _ before req to indicate that the parameter is not used
router.get('/tasks-list', (_req, res) => {
    // If tasks list is empty, return 404 status code
    if(tasks.length === 0) {
        return res.json({
            "message": "No tasks found in the list"
        });
    }
    res.status(200).json({
        "message": "Tasks List successfully fetched : ", tasks
    });
})

export default router;