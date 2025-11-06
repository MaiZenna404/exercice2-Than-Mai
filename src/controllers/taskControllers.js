import TaskModel from '../models/taskModel.js';

// Controller to handle CRUD operations on task model

export const getTasks = async (_req, res) => {
    try {
        const allTasks = await TaskModel.fetchAllTasks();
        if (allTasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found in the list' });
        }
        res.status(200).json({ message: 'Tasks List successfully fetched', tasks: allTasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

export const addTask = async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'A title is required for your new task' });
    }
    try {
        const newTask = await TaskModel.addTask({ title, description });
        res.status(201).json({ message: 'Task added successfully to the list', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await TaskModel.findIdTask(id);
        if (!task) {
            return res.status(404).json({ message: `Task with id ${id} not found` });
        }
        const deleted = await TaskModel.deleteTask(id);
        if (deleted) {
            res.status(200).json({ message: 'Task deleted successfully from the list' });
        } else {
            res.status(500).json({ message: 'Error deleting task' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};