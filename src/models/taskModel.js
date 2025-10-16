/**
 * Task Model to manage tasks in-memory
 * Provides methods to add, delete, and retrieve tasks.
 * Each task is an object with the following structure:
 * { id: string, title: string, description: string }
 */

import mongoose from "mongoose";

/**
 * Define the Mongoose schema for tasks
 */

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        minlength: [1, 'Task title cannot be empty'],
        maxlength: [100, 'Task title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: false,
        maxlength: [500, 'Task description cannot exceed 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Mongoose task model
const Task = mongoose.model('Task', tasksSchema);

class TaskModel {
    /* No longer needed since we initialize tasks from the Mongoose Schema above
    constructor() {
        this.tasks = []; // empty list by default
    }
    */
    
    // Fetch all tasks
    async fetchAllTasks() {
        try {
            return await Task.find();
        } catch (error) {
            throw new Error('Error fetching tasks');
        }
    }

    // Find a task by its ID
    async findIdTask(id) {
        try {
            return await Task.findById(id);
        } catch (error) {
            throw new Error('Error finding task');
        }
    }

    // Add a new task
    async addTask(task) {
        if (!task.title) throw new Error('Task title is required');
        try {
            const newTask = new Task(task);
            return await newTask.save();
        } catch (error) {
            throw new Error('Error adding task');
        }
    }

    // Delete a task by its ID
    async deleteTask(id) {
        try {
            const task = await this.findIdTask(id);
            if (task) {
                await Task.deleteOne({ _id: id });
                return true;
            }
            return false;
        } catch (error) {
            throw new Error('Error deleting task');
        }
    }

}

export default new TaskModel();