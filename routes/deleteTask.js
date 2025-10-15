import express from 'express';
import tasks from '../data/tasks.js';

const router = express.Router();

router.delete('/delete-task/:id', (req, res) => {
    const { id } = req.params;
    // Find the index of the task with the given id
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(400).json({
            "message": `Task with id ${id} not found`
        });
    } else if (tasks.length === 0) {
        tasks.splice(taskIndex, 1);
        return res.status(400).json({
            "message": `Your tasks list is empty`
        });
    } 
    // Remove the task from the array
    tasks.splice(taskIndex, 1);
    // If deletion is successful, send 200 status code, otherwise send 500 status code
    res.status(200).send('Task deleted successfully from the list');
});

export default router;