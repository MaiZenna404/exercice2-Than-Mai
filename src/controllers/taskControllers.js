import TaskModel  from '../models/taskModel.js';
import { v4 as uuidv4 } from 'uuid'; // module to generate unique IDs

// Controller to handle CRUD operation on task model

export const getTasks = (_req, res) => {
    const allTasks = TaskModel.fetchAllTasks();
    if (allTasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found in the list' });
    }
    res.status(200).json({ message: 'Tasks List successfully fetched', tasks: allTasks });
};

export const addTask = (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'A title is required for your new task' });
    }
    const newTask = { id: uuidv4(), title, description };
    TaskModel.addTask(newTask);
    res.status(201).json({ message: 'Task added successfully to the list', task: newTask });
};

export const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = TaskModel.findIdTask(id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: `Task with id ${id} not found` });
    }
    TaskModel.deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully from the list' });
};